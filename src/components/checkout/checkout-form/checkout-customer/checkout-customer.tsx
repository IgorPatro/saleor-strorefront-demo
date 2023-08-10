import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type CheckoutQuery } from "@/saleor/graphql";

import { useCheckoutFormCustomer } from "./hooks";

interface CheckoutCustomerProps {
  checkoutId: string;
  checkoutData: CheckoutQuery;
}

export const CheckoutCustomer = ({
  checkoutId,
  checkoutData,
}: CheckoutCustomerProps) => {
  const { form, onSubmit } = useCheckoutFormCustomer(checkoutId, checkoutData);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4 max-w-2xl"
    >
      <div className="flex flex-col gap-4 justify-end">
        <h1 className="text-2xl font-semibold">Customer data</h1>

        <div className="flex gap-3">
          <Input
            placeholder="First name"
            {...register("billingFirstName")}
            className={errors?.billingFirstName && "border-red-500"}
            disabled={isSubmitting}
          />
          <Input
            placeholder="Last name"
            {...register("billingLastName")}
            className={errors?.billingLastName && "border-red-500"}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Email"
            {...register("billingEmail")}
            className={errors?.billingEmail && "border-red-500"}
            disabled={isSubmitting}
          />
          <Input
            placeholder="Phone"
            {...register("billingPhone")}
            className={errors?.billingPhone && "border-red-500"}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Address"
            {...register("billingAddressStreet")}
            className={errors?.billingAddressStreet && "border-red-500"}
            disabled={isSubmitting}
          />
          <Input
            placeholder="Postal code"
            {...register("billingPostalCode")}
            className={errors?.billingPostalCode && "border-red-500"}
            disabled={isSubmitting}
          />
          <Input
            placeholder="City"
            {...register("billingAddressCity")}
            className={errors?.billingAddressCity && "border-red-500"}
            disabled={isSubmitting}
          />
        </div>

        <h1 className="text-2xl font-semibold">Shipping details</h1>

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

        <Button className="flex self-end" type="submit" disabled={isSubmitting}>
          Save
        </Button>
      </div>
    </form>
  );
};
