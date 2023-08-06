import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { CHECKOUT_EMAIL_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-email-update";
import { CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-billing-address-update";
import { CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-address-update";
import { Button } from "@/components/ui/button";

import { type CheckoutFormInterface } from "../types";

interface CheckoutCustomerProps {
  checkoutId: string;
  parcelLockerShippingMethodId: string | null;
  onNextStep: () => void;
}

export const CheckoutCustomer = ({
  checkoutId,
  parcelLockerShippingMethodId,
  onNextStep,
}: CheckoutCustomerProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useFormContext<CheckoutFormInterface>();
  const [updateEmail] = useMutation(CHECKOUT_EMAIL_UPDATE_MUTATION);
  const [updateBillingAddress] = useMutation(
    CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION
  );
  const [updateShippingAddress] = useMutation(
    CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION
  );

  const onMoveToShipping = async () => {
    const values = getValues();

    await updateEmail({
      variables: {
        checkoutId,
        email: values.email,
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

    const shippingAddress = {
      city:
        values.shippingMethodId === parcelLockerShippingMethodId
          ? values.shippingAddressCity
          : values.billingAddressCity,
      streetAddress1:
        values.shippingMethodId === parcelLockerShippingMethodId
          ? values.shippingAddressStreet
          : values.billingAddressStreet,
      postalCode:
        values.shippingMethodId === parcelLockerShippingMethodId
          ? values.shippingPostalCode
          : values.billingPostalCode,
    };

    await updateShippingAddress({
      variables: {
        checkoutId,
        ...shippingAddress,
      },
    });

    onNextStep();
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Customer data</h1>

      <div className="flex gap-3">
        <Input
          placeholder="First name"
          {...register("firstName")}
          className={errors?.firstName && "border-red-500"}
        />
        <Input
          placeholder="Last name"
          {...register("lastName")}
          className={errors?.lastName && "border-red-500"}
        />
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Email"
          {...register("email")}
          className={errors?.email && "border-red-500"}
        />
        <Input
          placeholder="Phone"
          {...register("phone")}
          className={errors?.phone && "border-red-500"}
        />
      </div>

      <div className="flex gap-3">
        <Input
          placeholder="Address"
          {...register("billingAddressStreet")}
          className={errors?.billingAddressStreet && "border-red-500"}
        />
        <Input
          placeholder="City"
          {...register("billingAddressCity")}
          className={errors?.billingAddressCity && "border-red-500"}
        />
        <Input
          placeholder="Postal code"
          {...register("billingPostalCode")}
          className={errors?.billingPostalCode && "border-red-500"}
        />
      </div>

      <div>Inny adres rozliczeniowy?</div>

      <Button onClick={() => onMoveToShipping()} disabled={isSubmitting}>
        Continue to shipping
      </Button>
    </div>
  );
};
