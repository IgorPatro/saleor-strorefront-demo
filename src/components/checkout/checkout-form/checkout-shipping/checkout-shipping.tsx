import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InpostGeowidget } from "react-inpost-geowidget";
import { CheckoutQuery } from "@/saleor/graphql";
import { type InpostGeowidgetPoint } from "@/types/inpost-geowidget";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { type CheckoutFormShippingInterface } from "./types";

interface CheckoutShippingProps {
  checkoutData: CheckoutQuery;
  parcelLockerShippingMethodId?: string;
}

export const CheckoutShipping = ({
  checkoutData,
  parcelLockerShippingMethodId,
}: CheckoutShippingProps) => {
  const form = useFormContext<CheckoutFormShippingInterface>();
  const [showGeowidget, setShowGeowidget] = React.useState(true);

  const {
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = form;

  const watchShippingMethodId = watch("shippingMethodId");
  const watchAll = watch();

  const onInPostPointSelect = (point: InpostGeowidgetPoint) => {
    setValue("parcelLockerName", point.name);
    setValue("parcelLockerCity", point.address_details.city);
    setValue(
      "parcelLockerStreet",
      `${point.address_details.street} ${point.address_details.building_number}`
    );
    setValue("parcelLockerPostalCode", point.address_details.post_code);

    setShowGeowidget(false);
  };

  if (checkoutData.checkout?.shippingMethods.length === 0) {
    return (
      <div className="flex flex-col gap-4 justify-end">
        <h1 className="text-2xl font-semibold">Dostawa</h1>
        <p>Dodaj adres dostawy, aby zobaczyć dostępne metody dostawy.</p>
      </div>
    );
  }

  const onShippingMethodChange = () => {};

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 justify-end">
        <h1 className="text-2xl font-semibold">Dostawa</h1>
        <FormField
          control={control}
          name="shippingMethodId"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {checkoutData.checkout?.shippingMethods?.map((method) => (
                    <FormItem key={method.id} className="flex flex-col">
                      <FormLabel className="font-normal">
                        <Card className="p-4">
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
                          watchShippingMethodId ===
                            parcelLockerShippingMethodId &&
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
                          {watchShippingMethodId === method.id &&
                          watchShippingMethodId ===
                            parcelLockerShippingMethodId &&
                          showGeowidget ? (
                            <div className="h-[32rem] mt-5">
                              <InpostGeowidget
                                token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMDcxMzIxOTgsImlhdCI6MTY5MTc3MjE5OCwianRpIjoiMTA4MGEzMWMtNzFjMC00ZjJlLTliMGQtMDdlN2RlMzA3YmY3IiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpjWmJSTWpUbndDaDZQMkNXN0oyZEFRIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiODA3MTA1OTEtMjZlZS00ZDBkLTlmMmQtNDA4OWUyZDc5NDhmIiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjgwNzEwNTkxLTI2ZWUtNGQwZC05ZjJkLTQwODllMmQ3OTQ4ZiIsImFsbG93ZWRfcmVmZXJyZXJzIjoiMjQzMC0yYTAyLWEzMTUtZTU0Mi1kOTgwLWExZDYtNDIzLTljMzUtNjQ5MC5uZ3Jvay1mcmVlLmFwcCIsInV1aWQiOiI2NDc2ZTgxMS01NDc2LTRlZjEtYTIxZi1kMDIwNjdkNGIzYzIifQ.Up076T4v3VQ_xGoiIDPNRyzCTpucmsDWI5S7u0GELbn_4taJzU8q652hPLUbv2I3oqTqtJQ4OL24gaGBw4a2PLw-JORdCHeaAdSHPQT3gWJm-WMwBSTbqf9xYVog9fBKrP4O1ZH9Ogj2Z7J5hvDRlGznYPN9W1pk694mObQLT3oshFRmaE8nzN_evYDpKivY1Djw9gpnlVxIK_pL2Krao4eWDhiKj_hatzXo3ImCcT3P2NC3xT9Y-FqUaBI-04rYiuWz5VMTHHLtT8Tjno8BH0pyVK5LdUOpNWYMIt9b2pyqlxUSmM_DsmukOlZ3ATKDPCSFCsNSNRh9kkYWRAmTig"
                                onPoint={onInPostPointSelect}
                              />
                            </div>
                          ) : null}
                        </Card>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full flex self-end mt-2"
          type="submit"
          disabled={isSubmitting}
        >
          Pay
        </Button>
      </div>
    </div>
  );
};
