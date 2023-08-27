import { P24, Currency, Country, Language } from "@ingameltd/node-przelewy24";
import { NextApiHandler } from "next";
import { serverClient } from "@/utils/apollo-client";
import { ORDER_MARK_PAID_MUTATION } from "@/graphql/mutations/order/order-mark-paid";

const confirmPayment: NextApiHandler = async (req, res) => {
  const orderId = req.query["orderId"] as string;

  console.log(req.query);
  console.log(req.body);
  console.log(req.headers);

  const p24 = new P24(
    239743,
    239743,
    "559c53effd614bc3c9c778d4e8bf2663",
    "9596415252ae05cd",
    {
      sandbox: process.env.NODE_ENV !== "production",
    }
  );

  const p24Verification = await p24.verifyTransaction({
    ...req.body,
    orderId: 4295174449,
  });

  console.log(p24Verification);

  const { data } = await serverClient.mutate({
    mutation: ORDER_MARK_PAID_MUTATION,
    variables: {
      orderId: orderId,
    },
  });

  // TODO: Remove old checkout to clean up user's cart

  return res.status(200).json(p24Verification);
};

export default confirmPayment;
