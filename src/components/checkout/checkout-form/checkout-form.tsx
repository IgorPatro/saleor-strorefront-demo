import React from "react";
import { CheckoutQuery } from "@/saleor/graphql";
import { Form } from "@/components/ui/form";

import { CheckoutSummary } from "./checkout-summary";
import { CheckoutInfo } from "./checkout-info";
import { CheckoutShipping } from "./checkout-shipping";

import { useCheckoutInfoForm } from "../checkout-form/checkout-info/hooks";
import { useCheckoutShippingForm } from "../checkout-form/checkout-shipping/hooks";

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
  const [step, setStep] = React.useState<"info" | "shipping">("info");

  const handleGoToShipping = () => setStep("shipping");

  const handleGoToInfo = () => setStep("info");

  const parcelLockerShippingMethodId =
    checkoutData?.checkout?.shippingMethods.find(
      (method) => method.metafields.isParcelLocker
    )?.id;

  const { form: infoForm, onSubmit: onInfoFormSubmit } = useCheckoutInfoForm(
    checkoutId,
    handleGoToShipping
  );

  const {
    formState: { isValid: isInfoFormValid, errors: infoFormErrors },
  } = infoForm;

  const { form: shippingForm, onSubmit: onShippingFormSubmit } =
    useCheckoutShippingForm(checkoutId, infoForm);

  const {
    formState: { isValid: isShippingFormValid, errors: shippingFormErrors },
  } = shippingForm;

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/2 p-10">
        {step === "info" ? (
          <Form {...infoForm}>
            <CheckoutInfo onSubmit={onInfoFormSubmit} />
          </Form>
        ) : null}
        {step === "shipping" ? (
          <Form {...shippingForm}>
            <CheckoutShipping
              checkoutId={checkoutId}
              checkoutData={checkoutData}
              infoForm={infoForm}
              parcelLockerShippingMethodId={parcelLockerShippingMethodId}
              onSubmit={onShippingFormSubmit}
              onMoveBack={handleGoToInfo}
            />
          </Form>
        ) : null}
      </div>
      <CheckoutSummary
        checkoutId={checkoutId}
        checkoutData={checkoutData}
        step={step}
        shippingForm={shippingForm}
      />
    </div>
  );
};
