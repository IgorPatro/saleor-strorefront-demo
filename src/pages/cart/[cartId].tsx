import React, { useEffect } from "react";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { CHECKOUT_LINES_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-lines-update";
import { CHECKOUT_LINES_DELETE_MUTATION } from "@/graphql/mutations/checkout/checkout-lines-delete";
import { useMutation, useQuery } from "@apollo/client";
import { client } from "@/utils/apollo-client";

const getFirstImage = (arrayOfInages: any[]) => {
  return arrayOfInages[0];
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cartId = ctx.query["cartId"] as string;

  return {
    props: { cartId },
  };
};

interface CheckoutPageProps {
  cartId: string;
}

const CheckoutPage = ({ cartId }: CheckoutPageProps) => {
  const { push } = useRouter();
  const [updateLines, { loading: isUpdateMutationLoading }] = useMutation(
    CHECKOUT_LINES_UPDATE_MUTATION
  );
  const [deleteLine, { loading: isDeleteMutationLoading }] = useMutation(
    CHECKOUT_LINES_DELETE_MUTATION
  );
  const {
    data,
    loading: isCheckoutQueryLoading,
    refetch,
  } = useQuery(CHECKOUT_QUERY, {
    variables: {
      checkoutId: cartId,
    },
  });

  console.log(data);

  const onGenerateOrder = async () => {
    client.clearStore();

    return push(`/checkout/${cartId}`);
  };

  const onProductUpdate = async (quantity: number, lineId: string) => {
    if (quantity === 0) return;

    await updateLines({
      variables: {
        checkoutId: cartId,
        lineId,
        quantity,
      },
    });

    return refetch();
  };

  const onProductDelete = async (lineId: string) => {
    await deleteLine({
      variables: {
        checkoutId: cartId,
        lineId,
      },
    });

    return refetch();
  };

  if (!data) return null;

  return (
    <div>
      {cartId}
      {data.checkout?.lines.map((line) => (
        <div key={line.id} className="p-2 flex items-center gap-8">
          <div>
            {line.variant.product.name}
            <br />
            {line.id}
            <br />
            <Image
              src={getFirstImage(line.variant.product.media ?? []).url}
              alt="not yet"
              width={300}
              height={500}
            />
          </div>
          <div>
            <input
              className="w-10 h-10 text-center border border-black"
              defaultValue={line.quantity}
              placeholder="1"
              onChange={(e) => onProductUpdate(Number(e.target.value), line.id)}
            />
            x {line.variant.pricing?.price?.gross.amount}PLN
            <button
              className="bg-blue-500 text-white px-2 py-1 disabled:bg-red-500"
              onClick={() => onProductDelete(line.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <div>
        <h1>Total: {data.checkout?.totalPrice?.gross.amount}PLN</h1>
      </div>
      <button
        className="px-10 py-2 bg-blue-500 text-white font-bold disabled:bg-red-500"
        onClick={onGenerateOrder}
        disabled={
          isUpdateMutationLoading ||
          isDeleteMutationLoading ||
          isCheckoutQueryLoading
        }
      >
        Make an order
      </button>
    </div>
  );
};

export default CheckoutPage;
