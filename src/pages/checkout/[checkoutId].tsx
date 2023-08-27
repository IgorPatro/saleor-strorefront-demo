import React, { type ReactNode } from "react";
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
  const { data: checkoutData, loading: isLoading } = useQuery(CHECKOUT_QUERY, {
    variables: {
      checkoutId: checkoutId,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!checkoutData?.checkout) return "No checkout data";

  return <CheckoutForm checkoutId={checkoutId} checkoutData={checkoutData} />;
};

CheckoutPage.getLayout = (page: ReactNode): ReactNode => {
  return <>{page}</>;
};

export default CheckoutPage;
