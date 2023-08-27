import React from "react";
import { type CheckoutQuery } from "@/saleor/graphql";
import { type CheckoutLine } from "@/saleor/graphql";
import { UseFormReturn } from "react-hook-form";

import { CheckoutPromoCodes } from "../checkout-promo-codes";
import { CheckoutProduct } from "../checkout-product";
import { type CheckoutShippingFormValues } from "../checkout-shipping/types";

interface CheckoutSummaryProps {
  checkoutId: string;
  checkoutData: CheckoutQuery;
  step: "info" | "shipping";
  shippingForm: UseFormReturn<CheckoutShippingFormValues>;
}

export const CheckoutSummary = ({
  checkoutId,
  checkoutData,
  step,
  shippingForm,
}: CheckoutSummaryProps) => {
  const { watch } = shippingForm;

  const shippingMethodId = watch("shippingMethodId");

  return (
    <div className="flex flex-col w-1/2 bg-gray-100 p-10 gap-4">
      {checkoutData.checkout?.lines.map((line) => (
        <CheckoutProduct key={line.id} line={line as CheckoutLine} />
      ))}
      <CheckoutPromoCodes checkoutId={checkoutId} checkoutData={checkoutData} />
      <div>
        Subtotal: {checkoutData.checkout?.subtotalPrice?.gross.amount} PLN
        <br />
        Shipping:{" "}
        {step === "info"
          ? "Obliczana w następnym kroku"
          : shippingMethodId
          ? `${checkoutData.checkout?.shippingPrice?.gross.amount} PLN`
          : "-"}
        <br />
        Total: {checkoutData.checkout?.totalPrice?.gross.amount} PLN
      </div>
    </div>
  );
};
