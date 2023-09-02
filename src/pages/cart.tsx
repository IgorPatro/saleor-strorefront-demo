import React from "react";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { client } from "@/utils/apollo-client";
import { type CheckoutLine } from "@/saleor/graphql";
import { useCart } from "@/hooks/use-cart";
import { CartTable } from "@/components/cart/cart-table";
import { Button } from "@/components/ui/button";

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
        <h1 className="text-2xl font-semibold">Twój koszyk jest pusty</h1>
        <p>
          You have no items in your cart. Click <Link href="/">here</Link> to
          continue shopping.
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-10 w-full">
      <div className="flex flex-col gap-4 justify-end w-full">
        <h1 className="text-2xl uppercase">Twój koszyk</h1>
        <p>Jeśli wybrałeś już swoje produkty - przejdź dalej</p>
        <CartTable lines={data.checkout?.lines as CheckoutLine[]} />
        {/* <CartSummary
            isDisabled={isLoading || isCheckoutQueryLoading}
            totalPrice={data.checkout?.totalPrice?.gross.amount ?? 0}
            onGenerateOrder={onGenerateOrder}
          /> */}
        <Button
          className="self-end"
          variant="secondary"
          onClick={onGenerateOrder}
        >
          Przejdź do zamówienia
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
