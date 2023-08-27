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
  CheckoutCustomerDataFormSchema,
  type CheckoutCustomerDataFormValues,
} from "./types";

export const useCheckoutInfoForm = (
  checkoutId: string,
  onMoveNext: () => void
) => {
  const client = useApolloClient();
  const { data } = useQuery(ME_QUERY);

  const form = useForm<CheckoutCustomerDataFormValues>({
    resolver: zodResolver(CheckoutCustomerDataFormSchema),
    defaultValues: {
      email: "",
      shippingPhone: "",
      shippingFirstName: "",
      shippingLastName: "",
      shippingAddressCity: "",
      shippingAddressStreet: "",
      shippingPostalCode: "",

      note: "",
      requireInvoice: false,

      billingCompany: "",
      billingNip: "",
      billingAddressCity: "",
      billingAddressStreet: "",
      billingPostalCode: "",
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

  const onSubmit = async (values: CheckoutCustomerDataFormValues) => {
    await updateEmail({
      variables: {
        checkoutId,
        email: values.email,
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

    await updateBillingAddress({
      variables: {
        checkoutId,
        firstName: values.shippingFirstName,
        lastName: values.shippingLastName,
        phone: values.shippingPhone,
        city: values.billingAddressCity || values.shippingAddressCity,
        companyName: `${values.billingCompany} ${values.billingNip}`,
        streetAddress1:
          values.billingAddressStreet || values.shippingAddressStreet,
        postalCode: values.billingPostalCode || values.shippingPostalCode,
      },
    });

    await client.refetchQueries({
      include: [CHECKOUT_QUERY],
    });

    return onMoveNext();
  };

  return {
    form,
    onSubmit,
  };
};