import React from "react";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { GetServerSideProps } from "next";
import { useQuery } from "@apollo/client";
import { CheckoutForm } from "@/components/checkout/checkout-form";

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
  const {
    data: checkoutData,
    loading: isLoading,
    refetch,
  } = useQuery(CHECKOUT_QUERY, {
    variables: {
      checkoutId: checkoutId,
    },
  });

  if (!checkoutData?.checkout) return "No checkout data";

  return (
    <div className="p-4 flex gap-10">
      <CheckoutForm
        checkoutId={checkoutId}
        checkoutData={checkoutData}
        isLoading={isLoading}
        refetch={refetch}
      />
    </div>
  );
};

export default CheckoutPage;
