import React from "react";
import { CheckoutQuery } from "@/saleor/graphql";
import { CheckoutProductItem } from "@/components/checkout/checkout-product-item";
import { type CheckoutLine } from "@/saleor/graphql";
import { Button } from "@/components/ui/button";

interface CheckoutSummaryProps {
  checkoutData: CheckoutQuery;
  isDisabled?: boolean;
}

export const CheckoutSummary = ({
  checkoutData,
  isDisabled,
}: CheckoutSummaryProps) => {
  return (
    <div className="w-full flex flex-col gap-3">
      {checkoutData.checkout?.lines.map((line) => (
        <CheckoutProductItem key={line.id} line={line as CheckoutLine} />
      ))}
      <div>Total: {checkoutData.checkout?.totalPrice?.gross.amount}PLN</div>
      <Button disabled={isDisabled}>Pay</Button>
    </div>
  );
};
