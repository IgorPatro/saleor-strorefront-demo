import { P24, Currency, Country, Language } from "@ingameltd/node-przelewy24";
import { NextApiHandler } from "next";
import { serverClient } from "@/utils/apolloClient";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { ORDER_CREATE_FROM_CHECKOUT_MUTATION } from "@/graphql/mutations/order/order-create-from-checkout";
import { randomString } from "@/utils/randomString";

const generatePayment: NextApiHandler = async (req, res) => {
  const { checkoutId } = req.body;

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
    sessionId: order.orderCreateFromCheckout?.order?.id ?? randomString(),
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
