import React from "react";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { CHECKOUT_LINES_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-lines-update";
import { CHECKOUT_LINES_DELETE_MUTATION } from "@/graphql/mutations/checkout/checkout-lines-delete";
import Link from "next/link";
import { useLocalStorage } from "@/utils/use-local-storage";
import { useMutation, useQuery } from "@apollo/client";
import { client } from "@/utils/apollo-client";
import { CartProductItem } from "@/components/cart/cart-product-item";
import { type CheckoutLine } from "@/saleor/graphql";
import { CartSummary } from "@/components/cart/cart-summary/cart-summary";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cartId = ctx.query["cartId"] as string;

  return {
    props: { cartId },
  };
};

interface CheckoutPageProps {
  cartId: string;
}

const CartPage = ({ cartId }: CheckoutPageProps) => {
  const { push } = useRouter();
  const [localStorageCartId, , removeLocalStorageCartId] =
    useLocalStorage<string>("cartId");
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

  React.useEffect(() => {
    if (!data?.checkout && localStorageCartId && !isCheckoutQueryLoading) {
      removeLocalStorageCartId();
      push("/");
    }
  }, [
    data,
    isCheckoutQueryLoading,
    localStorageCartId,
    push,
    removeLocalStorageCartId,
  ]);

  if (!data || !data?.checkout || data?.checkout?.lines.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-lg">
          You have no items in your cart. Click <Link href="/">here</Link> to
          continue shopping.
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-10">
      <div className="w-full flex flex-col gap-3">
        {data.checkout?.lines.map((line) => (
          <CartProductItem
            key={line.id}
            line={line as CheckoutLine}
            onDelete={onProductDelete}
            onUpdate={onProductUpdate}
          />
        ))}
      </div>
      <CartSummary
        isDisabled={
          isUpdateMutationLoading ||
          isDeleteMutationLoading ||
          isCheckoutQueryLoading
        }
        totalPrice={data.checkout?.totalPrice?.gross.amount ?? 0}
        onGenerateOrder={onGenerateOrder}
      />
    </div>
  );
};

export default CartPage;
