import React from "react";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InpostGeowidget } from "react-inpost-geowidget";
import { CheckoutQuery } from "@/saleor/graphql";
import { type InpostGeowidgetPoint } from "@/types/inpost-geowidget";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-method-update";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useMutation, useApolloClient } from "@apollo/client";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { type CheckoutInfoFormValues } from "../checkout-info/types";

import { type CheckoutShippingFormValues } from "./types";

interface CheckoutShippingProps {
  checkoutId: string;
  checkoutData: CheckoutQuery;
  infoForm: UseFormReturn<CheckoutInfoFormValues>;
  parcelLockerShippingMethodId?: string;
  onSubmit: (data: CheckoutShippingFormValues) => void;
  onMoveBack: () => void;
}

export const CheckoutShipping = ({
  checkoutId,
  checkoutData,
  infoForm,
  parcelLockerShippingMethodId,
  onSubmit,
  onMoveBack,
}: CheckoutShippingProps) => {
  const form = useFormContext<CheckoutShippingFormValues>();
  const [showGeowidget, setShowGeowidget] = React.useState(false);
  const [updateShippingMethod] = useMutation(
    CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION
  );
  const client = useApolloClient();

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const { getValues } = infoForm;

  const infoData = getValues();

  const watchShippingMethodId = watch("shippingMethodId");
  const watchAll = watch();

  const onInPostPointSelect = async (point: InpostGeowidgetPoint) => {
    if (!parcelLockerShippingMethodId) return;

    setValue("shippingMethodId", parcelLockerShippingMethodId);
    setValue("parcelLockerName", point.name);
    setValue("parcelLockerCity", point.address_details.city);
    setValue(
      "parcelLockerStreet",
      `${point.address_details.street} ${point.address_details.building_number}`
    );
    setValue("parcelLockerPostalCode", point.address_details.post_code);

    setShowGeowidget(false);

    await updateShippingMethod({
      variables: {
        checkoutId,
        shippingMethodId: parcelLockerShippingMethodId,
      },
    });

    await client.refetchQueries({
      include: [CHECKOUT_QUERY],
    });
  };

  const onShippingMethodChange = async (newShippingId: string) => {
    if (newShippingId === parcelLockerShippingMethodId) {
      return setShowGeowidget(true);
    }

    setValue("shippingMethodId", newShippingId);
    setShowGeowidget(false);

    await updateShippingMethod({
      variables: {
        checkoutId,
        shippingMethodId: newShippingId,
      },
    });

    await client.refetchQueries({
      include: [CHECKOUT_QUERY],
    });
  };

  const renderInPostGeowidget = () => {
    return (
      <InpostGeowidget
        token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMDg1MTYwMjgsImlhdCI6MTY5MzE1NjAyOCwianRpIjoiYTk5NGNmMTgtODQ4Yy00ODI3LThkZDQtYjlmY2UyMmQ3ZGFhIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpjWmJSTWpUbndDaDZQMkNXN0oyZEFRIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiNmIyZmZiZDgtNmRjOC00NDI1LTljY2UtZTU1YzViNmNhZmVkIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjZiMmZmYmQ4LTZkYzgtNDQyNS05Y2NlLWU1NWM1YjZjYWZlZCIsImFsbG93ZWRfcmVmZXJyZXJzIjoiNmRjNi0yYTAyLWEzMTUtZTU0Mi1kOTgwLTVjM2MtZDkyMy01MGNmLWNhOTUubmdyb2stZnJlZS5hcHAiLCJ1dWlkIjoiNjQ3NmU4MTEtNTQ3Ni00ZWYxLWEyMWYtZDAyMDY3ZDRiM2MyIn0.aT_c3N8ddcjgfpGrK1Ac0QNEn8NAM-0ivx08Bsad15IuzyyegGr5TbiYSHDrbgtwR0Z2tnOoO3kSppfjaQxh-xagv9BnEasis1sDwgUBnpOjlNBjvvtIIsiuT4wtm5KaYcF4h9cH4JPehDMwrltNuSlCnUyrdFj_H8hrHldqynk6ptG2N84gwy0vBXz7QOqmuNPnGCDu0xcXJYzYm9TwGuM_EF8AXdPPEjAqfoNn-6cPcTgdjfkXTd8mBxf9F-CvNXwbnxaHDIeVzeiGPshpEGoY8F64QCKbA442eT7rwLx21GwetxXjY1_jeOQx0k9cOQWum7LcRlfgKikqbI_Flw"
        onPoint={onInPostPointSelect}
      />
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4 max-w-2xl"
    >
      <div className="flex flex-col gap-4 justify-end">
        <h1 className="text-2xl font-semibold">Twoje zamówienie</h1>
        <p>{"Koszyk > Informacje > Dostawa > Płatność"}</p>

        <Card className="p-4 flex flex-col gap-1">
          Kontakt: {infoData.email}
          <hr />
          Dostawa: {infoData.shippingAddressStreet}
          {", "}
          {infoData.shippingPostalCode} {infoData.shippingAddressCity}
          <hr />
          Faktura: {infoData.billingCompany}, {infoData.billingNip}
        </Card>
        <Button className="self-end" onClick={onMoveBack} type="button">
          Edytuj
        </Button>

        <h1 className="text-2xl font-semibold">Metody dostawy</h1>

        <RadioGroup
          onValueChange={onShippingMethodChange}
          value={watchShippingMethodId}
          className="flex flex-col space-y-1"
        >
          {checkoutData.checkout?.shippingMethods?.map((method) => (
            <FormItem key={method.id} className="flex flex-col">
              <FormLabel className="font-normal">
                <Card className="p-4 cursor-pointer">
                  <div className="flex gap-2 items-center">
                    <FormControl>
                      <RadioGroupItem value={method.id} />
                    </FormControl>
                    <div className="w-full flex justify-between items-center">
                      <div>{method.name}</div>
                      <div>{method.price.amount}PLN</div>
                    </div>
                  </div>
                  {watchShippingMethodId === method.id &&
                  watchShippingMethodId === parcelLockerShippingMethodId &&
                  !showGeowidget ? (
                    <div className="flex flex-col gap-2 mt-4">
                      <b>{watchAll.parcelLockerName}</b>
                      <div>
                        {watchAll.parcelLockerStreet},{" "}
                        {watchAll.parcelLockerPostalCode}{" "}
                        {watchAll.parcelLockerCity}
                      </div>
                      <Button
                        className="self-start"
                        variant="outline"
                        onClick={() => setShowGeowidget(true)}
                      >
                        Pick parcel again
                      </Button>
                    </div>
                  ) : null}
                </Card>
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>

        <AlertDialog open={showGeowidget}>
          <AlertDialogContent className="h-3/4">
            <button
              onClick={() => setShowGeowidget(false)}
              className="w-5 h-5 absolute top-5 right-5"
            >
              X
            </button>
            <div className="mt-8">{renderInPostGeowidget()}</div>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex justify-between">
        <button onClick={onMoveBack}> {"< Przejdź do zamówienia"}</button>
        <Button disabled={isSubmitting} type="submit">
          Przejdź do płatności
        </Button>
      </div>
    </form>
  );
};
