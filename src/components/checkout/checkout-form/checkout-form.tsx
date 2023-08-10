import React from "react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form } from "@/components/ui/form";
import { CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-method-update";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { useMutation, useQuery } from "@apollo/client";
import { ME_QUERY } from "@/graphql/queries/me";
import { CheckoutProductItem } from "@/components/checkout/checkout-product-item";
import { type CheckoutLine } from "@/saleor/graphql";

import { CheckoutCustomer } from "./checkout-customer";
import { CheckoutShipping } from "./checkout-shipping";
import { CheckoutFormSchema, type CheckoutFormInterface } from "./types";

interface CheckoutDataFormProps {
  checkoutId: string;
}

export const CheckoutForm = ({ checkoutId }: CheckoutDataFormProps) => {
  const [step, setStep] = React.useState<"data" | "shipping" | "payment">(
    "data"
  );
  const { push } = useRouter();
  const [updateShippingMethod] = useMutation(
    CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION
  );
  const { data: checkoutData } = useQuery(CHECKOUT_QUERY, {
    variables: {
      checkoutId: checkoutId,
    },
  });
  const { data: me, loading: isMeQueryFetching } = useQuery(ME_QUERY);

  const form = useForm<CheckoutFormInterface>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      billingEmail: "",
      billingPhone: "",
      billingFirstName: "",
      billingLastName: "",
      billingAddressCity: "",
      billingAddressStreet: "",
      billingPostalCode: "",

      shippingPhone: "",
      shippingFirstName: "",
      shippingLastName: "",
      shippingAddressCity: "",
      shippingAddressStreet: "",
      shippingPostalCode: "",

      parcelLockerName: null,
      parcelLockerCity: null,
      parcelLockerStreet: null,
      parcelLockerPostalCode: null,

      shippingMethodId: "",
    },
  });

  const { watch, handleSubmit, setValue } = form;

  const watchAll = watch();

  React.useEffect(() => {
    setValue("billingEmail", me?.me?.email ?? "");
    setValue("billingPhone", me?.me?.defaultShippingAddress?.phone ?? "");
    setValue(
      "billingFirstName",
      me?.me?.defaultShippingAddress?.firstName ?? ""
    );
    setValue("billingLastName", me?.me?.defaultShippingAddress?.lastName ?? "");
    setValue("billingAddressCity", me?.me?.defaultShippingAddress?.city ?? "");
    setValue(
      "billingAddressStreet",
      me?.me?.defaultShippingAddress?.streetAddress1 ?? ""
    );
    setValue(
      "billingPostalCode",
      me?.me?.defaultShippingAddress?.postalCode ?? ""
    );

    setValue("shippingPhone", me?.me?.defaultShippingAddress?.phone ?? "");
    setValue(
      "shippingFirstName",
      me?.me?.defaultShippingAddress?.firstName ?? ""
    );
    setValue(
      "shippingLastName",
      me?.me?.defaultShippingAddress?.lastName ?? ""
    );
    setValue("shippingAddressCity", me?.me?.defaultShippingAddress?.city ?? "");
    setValue(
      "shippingAddressStreet",
      me?.me?.defaultShippingAddress?.streetAddress1 ?? ""
    );
    setValue(
      "shippingPostalCode",
      me?.me?.defaultShippingAddress?.postalCode ?? ""
    );
  }, [me, setValue]);

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
        email: values.billingEmail,
      });

      return push(data.link);
    } catch (err) {
      console.log(err);
    }
  };

  if (!checkoutData?.checkout) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 max-w-2xl"
      >
        <CheckoutCustomer
          onNextStep={() => setStep("shipping")}
          checkoutId={checkoutId}
          disabled={isMeQueryFetching}
        />
        <CheckoutShipping checkoutData={checkoutData} />
      </form>
      <div className="w-full flex flex-col gap-3">
        {checkoutData.checkout?.lines.map((line) => (
          <CheckoutProductItem key={line.id} line={line as CheckoutLine} />
        ))}
        <div>Total: {checkoutData.checkout?.totalPrice?.gross.amount}PLN</div>
        <div>
          Dostawa:
          {watchAll.parcelLockerName ? (
            <div>
              {watchAll.parcelLockerName}
              <br />
              {watchAll.parcelLockerCity}
              <br />
              {watchAll.parcelLockerStreet}
              <br />
              {watchAll.parcelLockerPostalCode}
            </div>
          ) : (
            <div>
              {watchAll.shippingAddressCity}
              <br />
              {watchAll.shippingAddressStreet}
              <br />
              {watchAll.shippingPostalCode}
            </div>
          )}
        </div>
      </div>
    </Form>
  );
};
