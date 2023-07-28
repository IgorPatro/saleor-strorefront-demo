import {
  P24,
  Order,
  Currency,
  Country,
  Language,
} from "@ingameltd/node-przelewy24";
import { NextApiHandler } from "next";
import { serverClient } from "@/utils/apolloClient";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { ORDER_CREATE_FROM_CHECKOUT_MUTATION } from "@/graphql/mutations/order/order-create-from-checkout";
import { CHECKOUT_EMAIL_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-email-update";
import { CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-billing-address-update";

const generatePayment: NextApiHandler = async (req, res) => {
  const { checkoutId, name, email } = req.body;

  const { data: checkout } = await serverClient.query({
    query: CHECKOUT_QUERY,
    variables: {
      checkoutId: checkoutId,
    },
  });

  if (!checkout) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  await serverClient.mutate({
    mutation: CHECKOUT_EMAIL_UPDATE_MUTATION,
    variables: {
      checkoutId,
      email,
    },
  });

  await serverClient.mutate({
    mutation: CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION,
    variables: {
      city: "Warsaw",
      streetAddress1: "Test",
      postalCode: "00-000",
      checkoutId,
    },
  });

  const { data: order } = await serverClient.mutate({
    mutation: ORDER_CREATE_FROM_CHECKOUT_MUTATION,
    variables: {
      checkoutId,
    },
  });

  if (
    !order ||
    (order?.orderCreateFromCheckout &&
      order?.orderCreateFromCheckout?.errors?.length > 0)
  ) {
    return res.status(401).json({
      ...order?.orderCreateFromCheckout?.errors,
    });
  }

  const p24 = new P24(
    239743,
    239743,
    "559c53effd614bc3c9c778d4e8bf2663",
    "9596415252ae05cd",
    {
      sandbox: true,
    }
  );

  const p24Transaction = await p24.createTransaction({
    sessionId: "fnjodsahgodsh",
    amount:
      Number(order?.orderCreateFromCheckout?.order?.total.gross.amount) * 100,
    currency: Currency.PLN,
    description: "Test",
    email: order?.orderCreateFromCheckout?.order?.user?.email ?? "",
    country: Country.Poland,
    language: Language.PL,
    urlReturn: "http://localhost:3000",
    urlStatus: `http://localhost:3000/api/confirm-payment?orderId=${order?.orderCreateFromCheckout?.order?.id}`,
    timeLimit: 15,
  });

  return res.status(200).json(p24Transaction);
};

export default generatePayment;
