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
  return (
    <div className="p-4 flex gap-10">
      <CheckoutForm checkoutId={checkoutId} />
    </div>
  );
};

export default CheckoutPage;
