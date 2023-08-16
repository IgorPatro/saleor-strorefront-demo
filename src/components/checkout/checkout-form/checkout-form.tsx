import React from "react";
import { Form } from "@/components/ui/form";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { useQuery } from "@apollo/client";
import { Card } from "@/components/ui/card";

import { useCheckoutForm } from "./hooks";
import { useCheckoutFormShipping } from "./checkout-shipping/hooks";
import { CheckoutCustomer } from "./checkout-customer";
import { CheckoutShipping } from "./checkout-shipping";
import { CheckoutSummary } from "./checkout-summary";
import { CheckoutPromoCodes } from "./checkout-promo-codes";

interface CheckoutDataFormProps {
  checkoutId: string;
}

export const CheckoutForm = ({ checkoutId }: CheckoutDataFormProps) => {
  const { data: checkoutData } = useQuery(CHECKOUT_QUERY, {
    variables: {
      checkoutId: checkoutId,
    },
  });

  const parcelLockerShippingMethodId =
    checkoutData?.checkout?.shippingMethods.find(
      (method) => method.metafields.isParcelLocker
    )?.id;

  const { form, onSubmit } = useCheckoutForm(checkoutId, checkoutData);

  if (!checkoutData?.checkout) return null;

  return (
    <Form {...form}>
      <div className="w-full flex flex-col gap-8">
        <CheckoutCustomer checkoutId={checkoutId} checkoutData={checkoutData} />
        <CheckoutShipping
          checkoutData={checkoutData}
          parcelLockerShippingMethodId={parcelLockerShippingMethodId}
        />
      </div>
      <Card className="w-full flex flex-col gap-8 p-4">
        <CheckoutSummary checkoutData={checkoutData} />
        <CheckoutPromoCodes
          checkoutId={checkoutId}
          checkoutData={checkoutData}
        />
      </Card>
    </Form>
  );
};
