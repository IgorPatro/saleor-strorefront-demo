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
import { useCart } from "@/hooks/use-cart";

const CartPage = () => {
  const { push } = useRouter();
  const { cartId, isLoading } = useCart();

  const { data, loading: isCheckoutQueryLoading } = useQuery(CHECKOUT_QUERY, {
    variables: {
      checkoutId: cartId as string,
    },
    skip: !cartId,
  });

  const onGenerateOrder = async () => {
    client.clearStore();

    return push(`/checkout/${cartId}`);
  };

  React.useEffect(() => {
    if (!data?.checkout && !isCheckoutQueryLoading) {
      push("/");
    }
  }, [data, isCheckoutQueryLoading, push]);

  if (
    !data ||
    !data?.checkout ||
    data?.checkout?.lines.length === 0 ||
    !cartId
  ) {
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
          <CartProductItem key={line.id} line={line as CheckoutLine} />
        ))}
      </div>
      <CartSummary
        isDisabled={isLoading || isCheckoutQueryLoading}
        totalPrice={data.checkout?.totalPrice?.gross.amount ?? 0}
        onGenerateOrder={onGenerateOrder}
      />
    </div>
  );
};

export default CartPage;
