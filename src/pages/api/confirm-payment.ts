import { NextApiHandler } from "next";
import { serverClient } from "@/utils/apolloClient";
import { ORDER_MARK_PAID_MUTATION } from "@/graphql/mutations/order/order-mark-paid";

const confirmPayment: NextApiHandler = async (req, res) => {
  const orderId = req.query["orderId"] as string;

  const { data } = await serverClient.mutate({
    mutation: ORDER_MARK_PAID_MUTATION,
    variables: {
      orderId: orderId,
    },
  });

  return res.status(200).json(data);
};

export default confirmPayment;
