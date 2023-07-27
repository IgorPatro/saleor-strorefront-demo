import {
  P24,
  Order,
  Currency,
  Country,
  Language,
} from "@ingameltd/node-przelewy24";
import { NextApiHandler } from "next";
import { serverClient } from "@/utils/apolloClient";
import { CHECKOUT_QUERY, type CheckoutQuery } from "@/graphql/queries/checkout";
import {
  CREATE_ORDER_FROM_CHECKOUT,
  type CreateCheckoutFromQuery,
} from "@/graphql/mutations/order-create-from-checkout";
import {
  CHECKOUT_EMAIL_UPDATE,
  type CheckoutEmailUpdate,
} from "@/graphql/mutations/checkout-email-update";
import {
  CHECKOUT_BILLING_ADDRESS_UPDATE,
  type CheckoutBillingAddressUpdate,
} from "@/graphql/mutations/checkout-billing-address-update";

const generatePayment: NextApiHandler = async (req, res) => {
  const { checkoutId, name, email } = req.body;

  const { data: checkout } = await serverClient.query<CheckoutQuery>({
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

  await serverClient.mutate<CheckoutEmailUpdate>({
    mutation: CHECKOUT_EMAIL_UPDATE,
    variables: {
      checkoutId,
      email,
    },
  });

  await serverClient.mutate<CheckoutBillingAddressUpdate>({
    mutation: CHECKOUT_BILLING_ADDRESS_UPDATE,
    variables: {
      city: "Warsaw",
      streetAddress1: "Test",
      postalCode: "00-000",
      checkoutId,
    },
  });

  const { data: order } = await serverClient.mutate<CreateCheckoutFromQuery>({
    mutation: CREATE_ORDER_FROM_CHECKOUT,
    variables: {
      checkoutId,
    },
  });

  if (!order || order.orderCreateFromCheckout.errors.length > 0) {
    return res.status(401).json({
      ...order?.orderCreateFromCheckout.errors,
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
      Number(order.orderCreateFromCheckout.order.total.gross.amount) * 100,
    currency: Currency.PLN,
    description: "Test",
    email: order.orderCreateFromCheckout.order.user.email,
    country: Country.Poland,
    language: Language.PL,
    urlReturn: "http://localhost:3000",
    urlStatus: `http://localhost:3000/api/confirm-payment?orderId=${order.orderCreateFromCheckout.order.id}`,
    timeLimit: 15,
  });

  return res.status(200).json(p24Transaction);
};

export default generatePayment;
