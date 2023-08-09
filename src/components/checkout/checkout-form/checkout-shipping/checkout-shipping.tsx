import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { InpostGeowidget } from "react-inpost-geowidget";
import { CheckoutQuery } from "@/saleor/graphql";
import { type InpostGeowidgetPoint } from "@/types/inpost-geowidget";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CheckoutShippingProps {
  checkoutData: CheckoutQuery;
}

export const CheckoutShipping = ({ checkoutData }: CheckoutShippingProps) => {
  const {
    control,
    formState: { isSubmitting },
    watch,
    setValue,
  } = useFormContext();

  const watchShippingMethodId = watch("shippingMethodId");
  const parcelLockerShippingMethod =
    checkoutData.checkout?.shippingMethods.find(
      (method) => method.metafields.isParcelLocker
    );

  React.useEffect(() => {
    if (parcelLockerShippingMethod !== watchShippingMethodId) {
      setValue("parcelLockerName", null);
      setValue("parcelLockerCity", null);
      setValue("parcelLockerStreet", null);
      setValue("parcelLockerPostalCode", null);
    }
  }, [parcelLockerShippingMethod, setValue, watchShippingMethodId]);

  const onInPostPointSelect = (point: InpostGeowidgetPoint) => {
    setValue("parcelLockerName", point.name);
    setValue("parcelLockerCity", point.address_details.city);
    setValue(
      "parcelLockerStreet",
      `${point.address_details.street} ${point.address_details.building_number}`
    );
    setValue("parcelLockerPostalCode", point.address_details.post_code);
  };

  return (
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
                          parcelLockerShippingMethod?.id ? (
                          <div className="h-[32rem] mt-5">
                            <InpostGeowidget
                              token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMDY5NzA5ODAsImlhdCI6MTY5MTYxMDk4MCwianRpIjoiYzlkYzhhZWEtZDY1OC00NjlmLThhNWUtNWFhOTBiY2ZiNzljIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpjWmJSTWpUbndDaDZQMkNXN0oyZEFRIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiMjlhYjgwYmYtY2Y5MC00NGUxLWJiOGEtMTEyZTQzY2I5YTA0Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjI5YWI4MGJmLWNmOTAtNDRlMS1iYjhhLTExMmU0M2NiOWEwNCIsImFsbG93ZWRfcmVmZXJyZXJzIjoiMjVmYS0yYTAyLWEzMTUtZTU0Mi1kOTgwLTZkMWMtYWM3Yi00ZjBmLWU0MjUubmdyb2stZnJlZS5hcHAiLCJ1dWlkIjoiNjQ3NmU4MTEtNTQ3Ni00ZWYxLWEyMWYtZDAyMDY3ZDRiM2MyIn0.WGcDyxk1WY55bIesukbPOUsKSBK5z0nIfQFvUaFlZhWDWnxe9fCyhCILb-kaLqIRSopKUxw_FpB8ADTSVftdN-hexU5bERQubeHv_NktUFDpCbkVnTrs3dnkDJ34Vwp6mBBfnsHypRHftBTorGFVXnNlz0oHk_s-mm-a1H7JTyRTWgF5DN532H6uH_cO11qHKd-amPqcOra5Yrcz9HVBhOXOpT3I92kz6ejlt9BgGuwKEicAPluIvz5tiXsURkUaZrjSvzw6LNwM8KSEbeZF4RRYS3iZa951kJTU7k3fR67vDCMSvPkohRsZWJjWHyPTD2o1-kjuGSvs3Ek3UTgqXA"
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
      <Button className="flex self-end" type="submit" disabled={isSubmitting}>
        Move to payment
      </Button>
    </div>
  );
};
