import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type CheckoutQuery } from "@/saleor/graphql";
import { useFormContext } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import { useCheckoutFormCustomer } from "./hooks";
import { CheckoutFormValues } from "../types";

interface CheckoutCustomerProps {
  checkoutId: string;
  checkoutData: CheckoutQuery;
}

export const CheckoutCustomer = ({
  checkoutId,
  checkoutData,
}: CheckoutCustomerProps) => {
  const form = useFormContext<CheckoutFormValues>();

  const {
    watch,
    register,
    getValues,
    formState: { errors, isSubmitting },
  } = form;

  const requireInvoice = watch("requireInvoice");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const values = getValues();

    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 max-w-2xl">
      <div className="flex flex-col gap-4 justify-end">
        <h1 className="text-2xl font-semibold">Customer data</h1>

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

        <div className="flex gap-3">
          <Input
            placeholder="Address"
            {...register("shippingAddressStreet")}
            className={errors?.shippingAddressStreet && "border-red-500"}
            disabled={isSubmitting}
          />
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

        <div className="flex items-center space-x-2">
          <label
            htmlFor="requireInvoice"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                className={errors?.billingCompany && "border-red-500"}
                disabled={isSubmitting}
              />
            </div>

            <div className="flex gap-3">
              <Input
                placeholder="Address"
                {...register("shippingAddressStreet")}
                className={errors?.shippingAddressStreet && "border-red-500"}
                disabled={isSubmitting}
              />
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
          </>
        ) : null}

        <Button className="flex self-end" type="submit" disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
};
