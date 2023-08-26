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
  isLoading?: boolean;
}

export const CheckoutForm = ({
  checkoutId,
  checkoutData,
  isLoading,
}: CheckoutDataFormProps) => {
  const [editMode, setEditMode] = React.useState(false);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  const parcelLockerShippingMethodId =
    checkoutData?.checkout?.shippingMethods.find(
      (method) => method.metafields.isParcelLocker
    )?.id;

  const { form: customerDataForm, onSubmit: onCustomerDataFormSubmit } =
    useCheckoutFormCustomer(checkoutId, checkoutData, toggleEditMode);

  const {
    formState: { isValid: isCustomerDataFormValid, errors: customerFormErrors },
  } = customerDataForm;

  const { form: shippingDataForm, onSubmit: onShippingFormSubmit } =
    useCheckoutFormShipping(checkoutId, parcelLockerShippingMethodId);

  const {
    formState: { isValid: isShippingFormValid, errors: shippingFormErrors },
  } = shippingDataForm;

  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <Form {...customerDataForm}>
          <CheckoutCustomer
            onSubmit={onCustomerDataFormSubmit}
            editMode={editMode}
            toggleEditMode={toggleEditMode}
          />
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
          isDisabled={
            !isCustomerDataFormValid ||
            !isShippingFormValid ||
            isLoading ||
            editMode
          }
        />
        <CheckoutPromoCodes
          checkoutId={checkoutId}
          checkoutData={checkoutData}
        />
      </Card>
    </>
  );
};
