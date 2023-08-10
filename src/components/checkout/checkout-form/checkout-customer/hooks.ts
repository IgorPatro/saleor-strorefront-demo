import React from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { CHECKOUT_EMAIL_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-email-update";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-billing-address-update";
import { CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-address-update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "@/graphql/queries/me";
import { type CheckoutQuery } from "@/saleor/graphql";

import {
  CheckoutFormCustomerSchema,
  type CheckoutFormCustomerInterface,
} from "./types";

export const useCheckoutFormCustomer = (
  checkoutId: string,
  checkoutData: CheckoutQuery
) => {
  const client = useApolloClient();
  const { data } = useQuery(ME_QUERY);

  const form = useForm<CheckoutFormCustomerInterface>({
    resolver: zodResolver(CheckoutFormCustomerSchema),
    defaultValues: {
      billingEmail: checkoutData.checkout?.email ?? "",

      billingPhone: checkoutData.checkout?.billingAddress?.phone ?? "",
      billingFirstName: checkoutData.checkout?.billingAddress?.firstName ?? "",
      billingLastName: checkoutData.checkout?.billingAddress?.lastName ?? "",
      billingAddressCity: checkoutData.checkout?.billingAddress?.city ?? "",
      billingAddressStreet:
        checkoutData.checkout?.billingAddress?.streetAddress1 ?? "",
      billingPostalCode:
        checkoutData.checkout?.billingAddress?.postalCode ?? "",

      shippingPhone: checkoutData.checkout?.shippingAddress?.phone ?? "",
      shippingFirstName:
        checkoutData.checkout?.shippingAddress?.firstName ?? "",
      shippingLastName: checkoutData.checkout?.shippingAddress?.lastName ?? "",
      shippingAddressCity: checkoutData.checkout?.shippingAddress?.city ?? "",
      shippingAddressStreet:
        checkoutData.checkout?.shippingAddress?.streetAddress1 ?? "",
      shippingPostalCode:
        checkoutData.checkout?.shippingAddress?.postalCode ?? "",
    },
  });

  const { setValue } = form;

  //    TODO: Add default data from user profile

  //   React.useEffect(() => {
  //     setValue("billingEmail", data?.me?.email ?? "");
  //     setValue("billingPhone", data?.me?.defaultShippingAddress?.phone ?? "");
  //     setValue(
  //       "billingFirstName",
  //       data?.me?.defaultShippingAddress?.firstName ?? ""
  //     );
  //     setValue(
  //       "billingLastName",
  //       data?.me?.defaultShippingAddress?.lastName ?? ""
  //     );
  //     setValue(
  //       "billingAddressCity",
  //       data?.me?.defaultShippingAddress?.city ?? ""
  //     );
  //     setValue(
  //       "billingAddressStreet",
  //       data?.me?.defaultShippingAddress?.streetAddress1 ?? ""
  //     );
  //     setValue(
  //       "billingPostalCode",
  //       data?.me?.defaultShippingAddress?.postalCode ?? ""
  //     );

  //     setValue("shippingPhone", data?.me?.defaultShippingAddress?.phone ?? "");
  //     setValue(
  //       "shippingFirstName",
  //       data?.me?.defaultShippingAddress?.firstName ?? ""
  //     );
  //     setValue(
  //       "shippingLastName",
  //       data?.me?.defaultShippingAddress?.lastName ?? ""
  //     );
  //     setValue(
  //       "shippingAddressCity",
  //       data?.me?.defaultShippingAddress?.city ?? ""
  //     );
  //     setValue(
  //       "shippingAddressStreet",
  //       data?.me?.defaultShippingAddress?.streetAddress1 ?? ""
  //     );
  //     setValue(
  //       "shippingPostalCode",
  //       data?.me?.defaultShippingAddress?.postalCode ?? ""
  //     );
  //   }, [data, setValue]);

  const [updateEmail] = useMutation(CHECKOUT_EMAIL_UPDATE_MUTATION);
  const [updateBillingAddress] = useMutation(
    CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION
  );
  const [updateShippingAddress] = useMutation(
    CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION
  );

  const onSubmit = async (values: CheckoutFormCustomerInterface) => {
    await updateEmail({
      variables: {
        checkoutId,
        email: values.billingEmail,
      },
    });

    await updateBillingAddress({
      variables: {
        checkoutId,
        firstName: values.billingFirstName,
        lastName: values.billingLastName,
        phone: values.billingPhone,
        city: values.billingAddressCity,
        streetAddress1: values.billingAddressStreet,
        postalCode: values.billingPostalCode,
      },
    });

    await updateShippingAddress({
      variables: {
        checkoutId,
        firstName: values.shippingFirstName,
        lastName: values.shippingLastName,
        phone: values.shippingPhone,
        city: values.shippingAddressCity,
        streetAddress1: values.shippingAddressStreet,
        postalCode: values.shippingPostalCode,
      },
    });

    await client.refetchQueries({
      include: [CHECKOUT_QUERY],
    });
  };

  return {
    form,
    onSubmit,
  };
};
