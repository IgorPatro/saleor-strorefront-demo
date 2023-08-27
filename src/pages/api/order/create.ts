import { P24, Currency, Country, Language } from "@ingameltd/node-przelewy24";
import { NextApiHandler } from "next";
import { serverClient } from "@/utils/apollo-client";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { ORDER_CREATE_FROM_CHECKOUT_MUTATION } from "@/graphql/mutations/order/order-create-from-checkout";
import { randomString } from "@/utils/random-string";
import { isApolloError, getApolloError } from "@/utils/apollo-error";
import { ORDER_ADD_NOTE_MUTATION } from "@/graphql/mutations/order/order-add-note";

export interface CreateOrderBody {
  checkoutId: string;
  note: string;
}

const createOrder: NextApiHandler = async (req, res) => {
  const { checkoutId, note } = req.body;

  const { data: checkout } = await serverClient.query({
    query: CHECKOUT_QUERY,
    variables: {
      checkoutId: checkoutId,
    },
  });

  if (!checkout || isApolloError(checkout)) {
    return res.status(400).send(getApolloError(checkout));
  }

  const { data: order } = await serverClient.mutate({
    mutation: ORDER_CREATE_FROM_CHECKOUT_MUTATION,
    variables: {
      checkoutId,
    },
  });

  if (!order || isApolloError(order)) {
    return res.status(400).send(getApolloError(order));
  }

  if (note) {
    const { data: orderAddNote } = await serverClient.mutate({
      mutation: ORDER_ADD_NOTE_MUTATION,
      variables: {
        orderId: order.orderCreateFromCheckout?.order?.id ?? "",
        message: note,
      },
    });

    if (!orderAddNote || isApolloError(orderAddNote)) {
      return res.status(400).send(getApolloError(orderAddNote));
    }
  }

  const p24 = new P24(
    239743,
    239743,
    "559c53effd614bc3c9c778d4e8bf2663",
    "9596415252ae05cd",
    {
      sandbox: process.env.NODE_ENV !== "production",
    }
  );

  try {
    const p24Transaction = await p24.createTransaction({
      sessionId: order.orderCreateFromCheckout?.order?.id ?? randomString(),
      amount:
        Number(order?.orderCreateFromCheckout?.order?.total.gross.amount) * 100,
      currency: Currency.PLN,
      description: "Test",
      email: order?.orderCreateFromCheckout?.order?.user?.email ?? "",
      country: Country.Poland,
      language: Language.PL,
      urlReturn: process.env.APP_DOMAIN ?? "https://patrocreations.com",
      urlStatus: `${process.env.APP_DOMAIN}/api/order/confirm?orderId=${order?.orderCreateFromCheckout?.order?.id}`,
      timeLimit: 15,
    });
    return res.status(200).json(p24Transaction);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export default createOrder;
