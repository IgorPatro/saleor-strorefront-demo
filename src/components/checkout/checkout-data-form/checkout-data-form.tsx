import React from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CHECKOUT_EMAIL_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-email-update";
import { CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-billing-address-update";
import { CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-address-update";
import { CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-shipping-method-update";
import { useMutation } from "@apollo/client";
import { InpostGeowidget } from "react-inpost-geowidget";
import { type InpostGeowidgetPoint } from "@/types/inpost-geowidget";
import { CheckoutQuery } from "@/saleor/graphql";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(5),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  billingAddressCity: z.string().min(1),
  billingAddressStreet: z.string().min(1),
  billingPostalCode: z.string().min(1),
  shippingAddressCity: z.string().min(1),
  shippingAddressStreet: z.string().min(1),
  shippingPostalCode: z.string().min(1),
  shippingMethodId: z.string().min(1),
});

interface CheckoutDataFormProps {
  checkoutId: string;
  checkoutData: CheckoutQuery;
}

export const CheckoutDataForm = ({
  checkoutId,
  checkoutData,
}: CheckoutDataFormProps) => {
  const { push } = useRouter();
  const [updateEmail] = useMutation(CHECKOUT_EMAIL_UPDATE_MUTATION);
  const [updateBillingAddress] = useMutation(
    CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION
  );
  const [updateShippingAddress] = useMutation(
    CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION
  );
  const [updateShippingMethod] = useMutation(
    CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      billingAddressCity: "",
      billingAddressStreet: "",
      billingPostalCode: "",
      shippingAddressCity: "",
      shippingAddressStreet: "",
      shippingPostalCode: "",
      shippingMethodId: "",
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = form;

  const watchShippingMethodId = watch("shippingMethodId");
  const parcelLockerShippingMethod =
    checkoutData.checkout?.shippingMethods.find(
      (method) => method.metafields.isParcelLocker
    );
  const watchAll = watch();

  console.log(watchAll);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateEmail({
      variables: {
        checkoutId,
        email: values.email,
      },
    });

    await updateBillingAddress({
      variables: {
        checkoutId,
        city: values.billingAddressCity,
        streetAddress1: values.billingAddressStreet,
        postalCode: values.billingPostalCode,
      },
    });

    const shippingAddress = {
      city:
        values.shippingMethodId === parcelLockerShippingMethod?.id
          ? values.shippingAddressCity
          : values.billingAddressCity,
      streetAddress1:
        values.shippingMethodId === parcelLockerShippingMethod?.id
          ? values.shippingAddressStreet
          : values.billingAddressStreet,
      postalCode:
        values.shippingMethodId === parcelLockerShippingMethod?.id
          ? values.shippingPostalCode
          : values.billingPostalCode,
    };

    await updateShippingAddress({
      variables: {
        checkoutId,
        ...shippingAddress,
      },
    });

    await updateShippingMethod({
      variables: {
        checkoutId,
        shippingMethodId: values.shippingMethodId,
      },
    });

    try {
      const { data } = await axios.post("/api/generate-order", {
        checkoutId,
        email: values.email,
      });

      return push(data.link);
    } catch (err) {
      console.log(err);
    }
  };

  const onInPostPointSelect = (point: InpostGeowidgetPoint) => {
    setValue("shippingAddressCity", point.address_details.city);
    setValue(
      "shippingAddressStreet",
      `${point.address_details.street} ${point.address_details.building_number}`
    );
    setValue("shippingPostalCode", point.address_details.post_code);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 max-w-2xl"
      >
        <h1 className="text-2xl font-semibold">Customer data</h1>

        <div className="flex gap-3">
          <Input
            placeholder="First name"
            {...register("firstName")}
            className={errors?.firstName && "border-red-500"}
          />
          <Input
            placeholder="Last name"
            {...register("lastName")}
            className={errors?.lastName && "border-red-500"}
          />
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Email"
            {...register("email")}
            className={errors?.email && "border-red-500"}
          />
          <Input
            placeholder="Phone"
            {...register("phone")}
            className={errors?.phone && "border-red-500"}
          />
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Address"
            {...register("billingAddressStreet")}
            className={errors?.billingAddressStreet && "border-red-500"}
          />
          <Input
            placeholder="City"
            {...register("billingAddressCity")}
            className={errors?.billingAddressCity && "border-red-500"}
          />
          <Input
            placeholder="Postal code"
            {...register("billingPostalCode")}
            className={errors?.billingPostalCode && "border-red-500"}
          />
        </div>

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
                      watchShippingMethodId ===
                        parcelLockerShippingMethod?.id ? (
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

        <Button type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
