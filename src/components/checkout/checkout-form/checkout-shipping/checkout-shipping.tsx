import React from "react";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InpostGeowidget } from "react-inpost-geowidget";
import { CheckoutQuery } from "@/saleor/graphql";
import { type InpostGeowidgetPoint } from "@/types/inpost-geowidget";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

import { type CheckoutShippingFormValues } from "./types";

interface CheckoutShippingProps {
  checkoutData: CheckoutQuery;
  parcelLockerShippingMethodId?: string;
  onSubmit: (data: CheckoutShippingFormValues) => void;
}

export const CheckoutShipping = ({
  checkoutData,
  parcelLockerShippingMethodId,
  onSubmit,
}: CheckoutShippingProps) => {
  const form = useFormContext<CheckoutShippingFormValues>();
  const [showGeowidget, setShowGeowidget] = React.useState(false);

  const { setValue, watch, getValues, trigger } = form;

  const watchShippingMethodId = watch("shippingMethodId");
  const watchAll = watch();

  const onInPostPointSelect = (point: InpostGeowidgetPoint) => {
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

    trigger();
    onSubmit(getValues());
  };

  if (checkoutData.checkout?.shippingMethods.length === 0) {
    return (
      <div className="flex flex-col gap-4 justify-end">
        <h1 className="text-2xl font-semibold">Dostawa</h1>
        <p>Dodaj adres dostawy, aby zobaczyć dostępne metody dostawy.</p>
      </div>
    );
  }

  const onShippingMethodChange = (newShippingId: string) => {
    if (newShippingId === parcelLockerShippingMethodId) {
      return setShowGeowidget(true);
    }

    setValue("shippingMethodId", newShippingId);
    setShowGeowidget(false);

    trigger();
    onSubmit(getValues());
  };

  const renderInPostGeowidget = () => {
    return (
      <InpostGeowidget
        token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMDgwODU2NTksImlhdCI6MTY5MjcyNTY1OSwianRpIjoiOWI1YWNlOGUtOTU3Zi00MGMyLTlmZjUtOWNjNWU1NDJiYWNkIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpjWmJSTWpUbndDaDZQMkNXN0oyZEFRIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiYjAxMDg5NTEtNWM0Yy00NTM1LWI0MDItZDk4ZGViNTk4NWQ2Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6ImIwMTA4OTUxLTVjNGMtNDUzNS1iNDAyLWQ5OGRlYjU5ODVkNiIsImFsbG93ZWRfcmVmZXJyZXJzIjoiNWY4MS0yYTAyLWEzMTUtZTU0Mi1kOTgwLTUwYWItYWNjMi1lZDJiLTU3YWMubmdyb2stZnJlZS5hcHAiLCJ1dWlkIjoiNjQ3NmU4MTEtNTQ3Ni00ZWYxLWEyMWYtZDAyMDY3ZDRiM2MyIn0.C5x_jP1Uqnx5IMU30NYzdJfDiZbgTuYCA_C6ItzpeLEr51ulMAr2rH1mGXFZ99mo3dwFHdVfX-2z6_0CdFgnhyoJtsvzt3XJQtFYZDCUG9bd_e6nefeGXbvWdWgZSiZ_Ukt3xCuXYDaDS77FI6hCi32-I2NkGRFgZ_bqTzxZPVu6GOj74RaldVDe6_bVTmUW9CS6rqO0cBT9oLxwspqcTc6L5KZuHFo__m1BIALIHnQPN4QFaaaZjvVhYPN80gPLgFSGfMjum9_pki4tYxGY12UxaIFOQvk4PRK2Ep78RF476TBrKFgVZ5d0E2hMj_qFMuE3OpE1x96b2BDyF1hi9g"
        onPoint={onInPostPointSelect}
      />
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 justify-end">
        <h1 className="text-2xl font-semibold">Dostawa</h1>
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
    </div>
  );
};
