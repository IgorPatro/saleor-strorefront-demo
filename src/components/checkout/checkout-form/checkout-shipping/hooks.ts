import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateOrder } from "@/network/create-order";
import { UseFormReturn } from "react-hook-form";
import { type CheckoutInfoFormValues } from "../checkout-info/types";

import {
  type CheckoutShippingFormValues,
  CheckoutShippingFormSchema,
} from "./types";

export const useCheckoutShippingForm = (
  checkoutId: string,
  infoForm: UseFormReturn<CheckoutInfoFormValues>
) => {
  const { push } = useRouter();

  const { getValues: getInfoFormValues } = infoForm;

  const { mutateAsync: createOrder } = useCreateOrder();

  const form = useForm<CheckoutShippingFormValues>({
    resolver: zodResolver(CheckoutShippingFormSchema),
    defaultValues: {
      parcelLockerName: null,
      parcelLockerCity: null,
      parcelLockerStreet: null,
      parcelLockerPostalCode: null,

      shippingMethodId: "",
    },
  });

  const onSubmit = async (values: CheckoutShippingFormValues) => {
    const infoValues = getInfoFormValues();

    const note =
      values.parcelLockerName || infoValues.requireInvoice
        ? `
      ${
        values.parcelLockerName
          ? `Paczkomat:
        ${values.parcelLockerName ?? ""}
        ${values.parcelLockerStreet ?? ""}
        ${values.parcelLockerPostalCode ?? ""}
        ${values.parcelLockerCity ?? ""}

      `
          : ""
      }
      ${
        infoValues.requireInvoice
          ? `Faktura:
        ${infoValues.billingCompany}
        ${infoValues.billingNip}
        ${infoValues.billingAddressStreet}
        ${infoValues.billingPostalCode}
        ${infoValues.billingAddressCity}
      `
          : ""
      }
    `
        : "";

    const data = await createOrder({
      checkoutId,
      note,
    });

    return push(data.link);
  };

  return {
    form,
    onSubmit,
  };
};
