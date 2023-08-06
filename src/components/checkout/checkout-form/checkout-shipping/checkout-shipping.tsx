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

  const onInPostPointSelect = (point: InpostGeowidgetPoint) => {
    setValue("shippingAddressCity", point.address_details.city);
    setValue(
      "shippingAddressStreet",
      `${point.address_details.street} ${point.address_details.building_number}`
    );
    setValue("shippingPostalCode", point.address_details.post_code);
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
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <RadioGroupItem value={method.id} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {method.name}
                      </FormLabel>
                    </div>
                    {watchShippingMethodId === method.id &&
                    watchShippingMethodId === parcelLockerShippingMethod?.id ? (
                      <div className="h-[32rem]">
                        <InpostGeowidget
                          token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwMDY2MjQ2MzQsImlhdCI6MTY5MTI2NDYzNCwianRpIjoiYWQyOWU5ODAtMDVkNi00YjgzLWEyYTItM2RiNGFjZDM4NjhiIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTpjWmJSTWpUbndDaDZQMkNXN0oyZEFRIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiNjVmNWU5ZjYtMTExZS00MGFiLTgwMzktZDdhZGUzZjI0Mjk3Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6IjY1ZjVlOWY2LTExMWUtNDBhYi04MDM5LWQ3YWRlM2YyNDI5NyIsImFsbG93ZWRfcmVmZXJyZXJzIjoiNGIwMS0yYTAyLWEzMTUtZTU0Mi1kOTgwLTQ4OWUtNDVmZC1kMGFlLTJkMzYubmdyb2stZnJlZS5hcHAiLCJ1dWlkIjoiNjQ3NmU4MTEtNTQ3Ni00ZWYxLWEyMWYtZDAyMDY3ZDRiM2MyIn0.C4uUIPxgTPgw5ldOe0LsD7qLkquKVo1Out8kAovcQSm0kOjzWULteDTubv0WkfyCCq6J1wMCwDOieuA3zwSgLFrBY6azz1N5UHf8LctERsH3B42X-kVbGcSfqFK14HB2wggZFlU0UvQX-eIiNnAOMQNV6Qx0AEmyT2IeLPYS4eREvVJL8LhFL7gpyJGsUJ0mvp57TSkTkNXVLtx_m9-AHbVeOxfp0hQIK4SUzn_4b6r3n59JV4_pOe9UztZXavqi0nIn6RJgwa-g3f-zb7S6ji-_aHLXTji2BTrc7V-KCEnzZeCzNGs4PK3PdeYficmp_Cstgdwp7Ex9DlZWWAzapg"
                          onPoint={onInPostPointSelect}
                        />
                      </div>
                    ) : null}
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
