import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldErrors } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { CheckoutInfoFormValues } from "./types";

interface CheckoutCustomerProps {
  onSubmit: (data: CheckoutInfoFormValues) => void;
}

export const CheckoutInfo = ({ onSubmit }: CheckoutCustomerProps) => {
  const form = useFormContext<CheckoutInfoFormValues>();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const requireInvoice = watch("requireInvoice");

  type CheckoutCustomerErrors = {
    billing: FieldErrors;
  } & typeof errors;

  const billingValidationFailure = (errors as CheckoutCustomerErrors).billing;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4 max-w-2xl"
    >
      <div className="flex flex-col gap-4 justify-end">
        <h1 className="text-2xl font-semibold">Twoje zamówienie</h1>
        <p>{"Koszyk > Informacje > Dostawa > Płatność"}</p>

        <div className="flex gap-3">
          <Input
            placeholder="First name"
            {...register("shippingFirstName")}
            className={errors?.shippingFirstName && "border-red-500"}
            disabled={isSubmitting}
          />
          <Input
            placeholder="Last name"
            {...register("shippingLastName")}
            className={errors?.shippingLastName && "border-red-500"}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Email"
            {...register("email")}
            className={errors?.email && "border-red-500"}
            disabled={isSubmitting}
          />
          <Input
            placeholder="Phone"
            {...register("shippingPhone")}
            className={errors?.shippingPhone && "border-red-500"}
            disabled={isSubmitting}
          />
        </div>

        <Input
          placeholder="Address"
          {...register("shippingAddressStreet")}
          className={errors?.shippingAddressStreet && "border-red-500"}
          disabled={isSubmitting}
        />
        <div className="flex gap-3">
          <Input
            placeholder="Postal code"
            {...register("shippingPostalCode")}
            className={errors?.shippingPostalCode && "border-red-500"}
            disabled={isSubmitting}
          />
          <Input
            placeholder="City"
            {...register("shippingAddressCity")}
            className={errors?.shippingAddressCity && "border-red-500"}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex items-center space-x-2 my-2">
          <label
            htmlFor="requireInvoice"
            className={twMerge(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-20"
            )}
          >
            Require invoice
          </label>
          <FormField
            control={form.control}
            name="requireInvoice"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isSubmitting}
              />
            )}
          />
        </div>

        {requireInvoice ? (
          <>
            <div className="flex gap-3">
              <Input
                placeholder="Company"
                {...register("billingCompany")}
                className={
                  (errors?.billingCompany || billingValidationFailure) &&
                  "border-red-500"
                }
                disabled={isSubmitting}
              />
              <Input
                placeholder="NIP"
                {...register("billingNip")}
                className={
                  (errors?.billingNip || billingValidationFailure) &&
                  "border-red-500"
                }
                disabled={isSubmitting}
              />
            </div>

            <Input
              placeholder="Address"
              {...register("billingAddressStreet")}
              className={
                (errors?.billingAddressStreet || billingValidationFailure) &&
                "border-red-500"
              }
              disabled={isSubmitting}
            />

            <div className="flex gap-3">
              <Input
                placeholder="Postal code"
                {...register("billingPostalCode")}
                className={
                  (errors?.billingPostalCode || billingValidationFailure) &&
                  "border-red-500"
                }
                disabled={isSubmitting}
              />
              <Input
                placeholder="City"
                {...register("billingAddressCity")}
                className={
                  (errors?.billingAddressCity || billingValidationFailure) &&
                  "border-red-500"
                }
                disabled={isSubmitting}
              />
            </div>
          </>
        ) : null}

        <Button disabled={isSubmitting} className="self-end">
          Przejdź do dostawy
        </Button>
      </div>
    </form>
  );
};
