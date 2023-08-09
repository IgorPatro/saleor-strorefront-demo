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
  onNextStep: () => void;
}

export const CheckoutCustomer = ({
  checkoutId,
  onNextStep,
}: CheckoutCustomerProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDifferentShippingAddress, setShowDifferentShippingAddress] =
    React.useState(false);
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

  const onMoveToShipping = async () => {
    trigger();
    if (!isValid) return;
    const values = getValues();

    setIsLoading(true);

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

    // const shippingAddress = {
    //   city:
    //     values.shippingMethodId === parcelLockerShippingMethodId
    //       ? values.shippingAddressCity
    //       : values.billingAddressCity,
    //   streetAddress1:
    //     values.shippingMethodId === parcelLockerShippingMethodId
    //       ? values.shippingAddressStreet
    //       : values.billingAddressStreet,
    //   postalCode:
    //     values.shippingMethodId === parcelLockerShippingMethodId
    //       ? values.shippingPostalCode
    //       : values.billingPostalCode,
    // };

    await updateShippingAddress({
      variables: {
        checkoutId,
        // ...shippingAddress,
        city: values.billingAddressCity,
        streetAddress1: values.billingAddressStreet,
        postalCode: values.billingPostalCode,
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
          placeholder="Postal code"
          {...register("billingPostalCode")}
          className={errors?.billingPostalCode && "border-red-500"}
        />
        <Input
          placeholder="City"
          {...register("billingAddressCity")}
          className={errors?.billingAddressCity && "border-red-500"}
        />
      </div>

      <div className="flex gap-2 items-center">
        <Checkbox
          id="differentShippingAddress"
          checked={showDifferentShippingAddress}
          onCheckedChange={(checked) => {
            setShowDifferentShippingAddress(checked as boolean);
          }}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="differentShippingAddress"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Different shipping address
          </label>
        </div>
      </div>

      {showDifferentShippingAddress ? (
        <div className="flex gap-3">
          <Input
            placeholder="Address"
            {...register("shippingAddressStreet")}
            className={errors?.shippingAddressStreet && "border-red-500"}
          />
          <Input
            placeholder="Postal code"
            {...register("shippingPostalCode")}
            className={errors?.shippingPostalCode && "border-red-500"}
          />
          <Input
            placeholder="City"
            {...register("shippingAddressCity")}
            className={errors?.shippingAddressCity && "border-red-500"}
          />
        </div>
      ) : null}

      <Button
        className="flex self-end"
        type="button"
        onClick={() => onMoveToShipping()}
        disabled={isLoading}
      >
        Continue to shipping
      </Button>
    </div>
  );
};
