import React from "react";
import { Form } from "@/components/ui/form";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { useQuery } from "@apollo/client";
import { Card } from "@/components/ui/card";

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

  const { form, onSubmit } = useCheckoutFormShipping(
    checkoutId,
    parcelLockerShippingMethodId
  );

  const { handleSubmit } = form;

  if (!checkoutData?.checkout) return null;

  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <CheckoutCustomer checkoutId={checkoutId} checkoutData={checkoutData} />
      </div>
      <Card className="w-full flex flex-col gap-8 p-4">
        <CheckoutSummary checkoutData={checkoutData} />
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-4 max-w-2xl"
          >
            <CheckoutShipping
              checkoutData={checkoutData}
              parcelLockerShippingMethodId={parcelLockerShippingMethodId}
            />
            <CheckoutPromoCodes
              checkoutId={checkoutId}
              checkoutData={checkoutData}
            />
          </form>
        </Form>
      </Card>
    </>
  );
};
