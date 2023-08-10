import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useMutation, useApolloClient } from "@apollo/client";
import { CHECKOUT_EMAIL_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-email-update";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-billing-address-update";
import { CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-address-update";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { type CheckoutFormInterface } from "../types";

interface CheckoutCustomerProps {
  checkoutId: string;
  disabled?: boolean;
  onNextStep: () => void;
}

export const CheckoutCustomer = ({
  checkoutId,
  disabled,
  onNextStep,
}: CheckoutCustomerProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const client = useApolloClient();

  const {
    register,
    formState: { errors, isValid },
    getValues,
    trigger,
  } = useFormContext<CheckoutFormInterface>();

  const [updateEmail] = useMutation(CHECKOUT_EMAIL_UPDATE_MUTATION);
  const [updateBillingAddress] = useMutation(
    CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION
  );
  const [updateShippingAddress] = useMutation(
    CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION
  );

  const onSave = async () => {
    trigger();
    if (!isValid) return;
    const values = getValues();

    setIsLoading(true);

    await updateEmail({
      variables: {
        checkoutId,
        email: values.billingEmail,
      },
    });

    await updateBillingAddress({
      variables: {
        checkoutId,
        city: values.billingAddressCity,
        streetAddress1: values.billingAddressStreet,
        postalCode: values.billingPostalCode,
      },
    });

    await updateShippingAddress({
      variables: {
        checkoutId,
        city: values.shippingAddressCity,
        streetAddress1: values.shippingAddressStreet,
        postalCode: values.shippingPostalCode,
      },
    });

    await client.refetchQueries({
      include: [CHECKOUT_QUERY],
    });

    setIsLoading(false);

    return onNextStep();
  };

  return (
    <div className="flex flex-col gap-4 justify-end">
      <h1 className="text-2xl font-semibold">Customer data</h1>

      <div className="flex gap-3">
        <Input
          placeholder="First name"
          {...register("billingFirstName")}
          className={errors?.billingFirstName && "border-red-500"}
          disabled={disabled}
        />
        <Input
          placeholder="Last name"
          {...register("billingLastName")}
          className={errors?.billingLastName && "border-red-500"}
          disabled={disabled}
        />
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Email"
          {...register("billingEmail")}
          className={errors?.billingEmail && "border-red-500"}
          disabled={disabled}
        />
        <Input
          placeholder="Phone"
          {...register("billingPhone")}
          className={errors?.billingPhone && "border-red-500"}
          disabled={disabled}
        />
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Address"
          {...register("billingAddressStreet")}
          className={errors?.billingAddressStreet && "border-red-500"}
          disabled={disabled}
        />
        <Input
          placeholder="Postal code"
          {...register("billingPostalCode")}
          className={errors?.billingPostalCode && "border-red-500"}
          disabled={disabled}
        />
        <Input
          placeholder="City"
          {...register("billingAddressCity")}
          className={errors?.billingAddressCity && "border-red-500"}
          disabled={disabled}
        />
      </div>

      <h1 className="text-2xl font-semibold">Shipping details</h1>

      <div className="flex gap-3">
        <Input
          placeholder="First name"
          {...register("shippingFirstName")}
          className={errors?.shippingFirstName && "border-red-500"}
          disabled={disabled}
        />
        <Input
          placeholder="Last name"
          {...register("shippingLastName")}
          className={errors?.shippingLastName && "border-red-500"}
          disabled={disabled}
        />
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Phone"
          {...register("shippingPhone")}
          className={errors?.shippingPhone && "border-red-500"}
          disabled={disabled}
        />
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Address"
          {...register("shippingAddressStreet")}
          className={errors?.shippingAddressStreet && "border-red-500"}
          disabled={disabled}
        />
        <Input
          placeholder="Postal code"
          {...register("shippingPostalCode")}
          className={errors?.shippingPostalCode && "border-red-500"}
          disabled={disabled}
        />
        <Input
          placeholder="City"
          {...register("shippingAddressCity")}
          className={errors?.shippingAddressCity && "border-red-500"}
          disabled={disabled}
        />
      </div>

      <Button
        className="flex self-end"
        type="button"
        onClick={() => onSave()}
        disabled={isLoading || disabled}
      >
        Save
      </Button>
    </div>
  );
};
