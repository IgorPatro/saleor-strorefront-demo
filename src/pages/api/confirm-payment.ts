import { NextApiHandler } from "next";
import { serverClient } from "@/utils/apolloClient";
import { MARK_ORDER_PAID } from "@/graphql/mutations/mark-order-paid";

const confirmPayment: NextApiHandler = async (req, res) => {
  const { orderId } = req.query;

  const { data } = await serverClient.mutate({
    mutation: MARK_ORDER_PAID,
    variables: {
      orderId: orderId,
    },
  });

  return res.status(200).json(data);
};

export default confirmPayment;
