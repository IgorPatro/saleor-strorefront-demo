import React from "react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-method-update";
import { CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-address-update";
import { useMutation } from "@apollo/client";

import {
  type CheckoutFormShippingInterface,
  CheckoutFormShippingSchema,
} from "./types";

export const useCheckoutFormShipping = (checkoutId: string) => {
  const { push } = useRouter();
  const [updateShippingMethod] = useMutation(
    CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION
  );
  const [updateShippingAddress] = useMutation(
    CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION
  );

  const form = useForm<CheckoutFormShippingInterface>({
    resolver: zodResolver(CheckoutFormShippingSchema),
    defaultValues: {
      parcelLockerName: null,
      parcelLockerCity: null,
      parcelLockerStreet: null,
      parcelLockerPostalCode: null,

      shippingMethodId: "",
    },
  });

  const onSubmit = async (values: CheckoutFormShippingInterface) => {
    await updateShippingMethod({
      variables: {
        checkoutId,
        shippingMethodId: values.shippingMethodId,
      },
    });

    if (
      values.parcelLockerName &&
      values.parcelLockerCity &&
      values.parcelLockerStreet &&
      values.parcelLockerPostalCode
    ) {
      await updateShippingAddress({
        variables: {
          checkoutId,
          city: values.parcelLockerCity,
          streetAddress1: values.parcelLockerStreet,
          postalCode: values.parcelLockerPostalCode,
          streetAddress2: values.parcelLockerName,
        },
      });
    }

    try {
      const { data } = await axios.post("/api/generate-order", {
        checkoutId,
      });

      return push(data.link);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    form,
    onSubmit,
  };
};
