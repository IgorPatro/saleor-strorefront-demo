import React from "react";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { GetServerSideProps } from "next";
import { useQuery } from "@apollo/client";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutProductItem } from "@/components/checkout/checkout-product-item";
import { type CheckoutLine } from "@/saleor/graphql";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const checkoutId = ctx.query["checkoutId"] as string;

  return {
    props: { checkoutId },
  };
};

interface CheckoutPageProps {
  checkoutId: string;
}

const CheckoutPage = ({ checkoutId }: CheckoutPageProps) => {
  const { data, refetch } = useQuery(CHECKOUT_QUERY, {
    variables: {
      checkoutId: checkoutId,
    },
  });

  if (!data) return null;

  return (
    <div className="p-4 flex gap-10">
      <CheckoutForm
        checkoutId={checkoutId}
        checkoutData={data}
        refetchCheckout={refetch}
      />
      <div className="w-full flex flex-col gap-3">
        {data.checkout?.lines.map((line) => (
          <CheckoutProductItem key={line.id} line={line as CheckoutLine} />
        ))}
        <div>Total: {data.checkout?.totalPrice?.gross.amount}PLN</div>
      </div>
    </div>
  );
};

export default CheckoutPage;
