import React from "react";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { CheckoutQuery } from "@/saleor/graphql";

import { useCheckoutFormCustomer } from "./checkout-customer/hooks";
import { useCheckoutFormShipping } from "./checkout-shipping/hooks";
import { CheckoutCustomer } from "./checkout-customer";
import { CheckoutShipping } from "./checkout-shipping";
import { CheckoutSummary } from "./checkout-summary";
import { CheckoutPromoCodes } from "./checkout-promo-codes";

interface CheckoutDataFormProps {
  checkoutId: string;
  checkoutData: CheckoutQuery;
}

export const CheckoutForm = ({
  checkoutId,
  checkoutData,
}: CheckoutDataFormProps) => {
  const parcelLockerShippingMethodId =
    checkoutData?.checkout?.shippingMethods.find(
      (method) => method.metafields.isParcelLocker
    )?.id;

  const { form: customerDataForm, onSubmit: onCustomerDataFormSubmit } =
    useCheckoutFormCustomer(checkoutId, checkoutData);

  const {
    formState: { isValid: isCustomerDataFormValid },
  } = customerDataForm;

  const { form: shippingDataForm, onSubmit: onShippingFormSubmit } =
    useCheckoutFormShipping(checkoutId, parcelLockerShippingMethodId);

  const {
    formState: { isValid: isShippingFormValid },
  } = shippingDataForm;

  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <Form {...customerDataForm}>
          <CheckoutCustomer onSubmit={onCustomerDataFormSubmit} />
        </Form>
        <Form {...shippingDataForm}>
          <CheckoutShipping
            checkoutData={checkoutData}
            parcelLockerShippingMethodId={parcelLockerShippingMethodId}
            onSubmit={onShippingFormSubmit}
          />
        </Form>
      </div>
      <Card className="w-full flex flex-col gap-8 p-4">
        <CheckoutSummary
          checkoutData={checkoutData}
          isDisabled={!isCustomerDataFormValid || !isShippingFormValid}
        />
        <CheckoutPromoCodes
          checkoutId={checkoutId}
          checkoutData={checkoutData}
        />
      </Card>
    </>
  );
};
