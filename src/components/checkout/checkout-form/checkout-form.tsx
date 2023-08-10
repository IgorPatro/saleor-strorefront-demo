import React from "react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form } from "@/components/ui/form";
import { CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-method-update";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { useMutation, useQuery } from "@apollo/client";
import { ME_QUERY } from "@/graphql/queries/me";
import { CheckoutProductItem } from "@/components/checkout/checkout-product-item";
import { type CheckoutLine } from "@/saleor/graphql";

import { CheckoutCustomer } from "./checkout-customer";
import { CheckoutShipping } from "./checkout-shipping";

interface CheckoutDataFormProps {
  checkoutId: string;
}

export const CheckoutForm = ({ checkoutId }: CheckoutDataFormProps) => {
  const { data: checkoutData } = useQuery(CHECKOUT_QUERY, {
    variables: {
      checkoutId: checkoutId,
    },
  });

  if (!checkoutData?.checkout) return null;

  return (
    <>
      <div className="flex flex-col gap-8">
        <CheckoutCustomer checkoutId={checkoutId} checkoutData={checkoutData} />
        <CheckoutShipping checkoutId={checkoutId} checkoutData={checkoutData} />
      </div>
      <div className="w-full flex flex-col gap-3">
        {checkoutData.checkout?.lines.map((line) => (
          <CheckoutProductItem key={line.id} line={line as CheckoutLine} />
        ))}
        <div>Total: {checkoutData.checkout?.totalPrice?.gross.amount}PLN</div>
      </div>
    </>
  );
};
