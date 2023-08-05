import React from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { CHECKOUT_EMAIL_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-email-update";
import { CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-billing-address-update";
import { useMutation, useQuery } from "@apollo/client";

const formSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(5),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  street: z.string(),
  postalCode: z.string(),
});

interface CheckoutDataFormProps {
  checkoutId: string;
}

export const CheckoutDataForm = ({ checkoutId }: CheckoutDataFormProps) => {
  const { push } = useRouter();
  const [updateEmail] = useMutation(CHECKOUT_EMAIL_UPDATE_MUTATION);
  const [updateBillingAddress] = useMutation(
    CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      city: "",
      street: "",
      postalCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateEmail({
      variables: {
        checkoutId,
        email: values.email,
      },
    });

    await updateBillingAddress({
      variables: {
        checkoutId,
        city: values.city,
        streetAddress1: values.street,
        postalCode: values.postalCode,
      },
    });

    try {
      const { data } = await axios.post("/api/generate-order", {
        checkoutId,
        email: values.email,
      });

      return push(data.link);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4 max-w-2xl"
    >
      <h1 className="text-2xl font-semibold">Customer data</h1>

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
          placeholder="Address"
          {...register("street")}
          className={errors?.street && "border-red-500"}
        />
        <Input
          placeholder="City"
          {...register("city")}
          className={errors?.city && "border-red-500"}
        />
        <Input
          placeholder="Postal code"
          {...register("postalCode")}
          className={errors?.postalCode && "border-red-500"}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
};
