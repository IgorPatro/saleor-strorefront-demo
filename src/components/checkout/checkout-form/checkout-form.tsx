import React from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form } from "@/components/ui/form";
import { CHECKOUT_EMAIL_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-email-update";
import { CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-billing-address-update";
import { CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-address-update";
import { CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-method-update";
import { useMutation } from "@apollo/client";
import { CheckoutQuery } from "@/saleor/graphql";
import { type ApolloQueryResult } from "@apollo/client";

import { CheckoutCustomer } from "./checkout-customer";
import { CheckoutShipping } from "./checkout-shipping";
import { CheckoutFormSchema, type CheckoutFormInterface } from "./types";

interface CheckoutDataFormProps {
  checkoutId: string;
  checkoutData: CheckoutQuery;
}

export const CheckoutForm = ({
  checkoutId,
  checkoutData,
}: CheckoutDataFormProps) => {
  const [step, setStep] = React.useState<"data" | "shipping" | "payment">(
    "data"
  );
  const { push } = useRouter();
  const [updateShippingMethod] = useMutation(
    CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION
  );

  const form = useForm<CheckoutFormInterface>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      billingAddressCity: "",
      billingAddressStreet: "",
      billingPostalCode: "",
      shippingAddressCity: "",
      shippingAddressStreet: "",
      shippingPostalCode: "",
      shippingMethodId: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (values: CheckoutFormInterface) => {
    await updateShippingMethod({
      variables: {
        checkoutId,
        shippingMethodId: values.shippingMethodId,
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
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 max-w-2xl"
      >
        {step === "data" && (
          <CheckoutCustomer
            onNextStep={() => setStep("shipping")}
            checkoutId={checkoutId}
          />
        )}
        {step === "shipping" && (
          <CheckoutShipping checkoutData={checkoutData} />
        )}
      </form>
    </Form>
  );
};
