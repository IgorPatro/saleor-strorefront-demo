import React from "react";
import { type Address } from "@/saleor/graphql";
import { set, useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCOUNT_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/account/account-address-update";
import { useMutation, useApolloClient } from "@apollo/client";
import * as z from "zod";

interface AddressCardProps {
  address: Address;
}

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  streetAddress1: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
});

export const AddressCard = ({ address }: AddressCardProps) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const client = useApolloClient();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone ?? "",
      streetAddress1: address.streetAddress1,
      city: address.city,
      postalCode: address.postalCode,
    },
    resolver: zodResolver(formSchema),
  });

  const [updateAddress] = useMutation(ACCOUNT_ADDRESS_UPDATE_MUTATION);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    const data = await updateAddress({
      variables: {
        addressId: address.id,
        ...values,
      },
    });

    console.log(data);

    setIsEditMode(false);
    return await client.resetStore();
  };

  return (
    <div className="" key={address.id}>
      {isEditMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("firstName")} placeholder="firstName" />
          <Input {...register("lastName")} placeholder="lastName" />
          <Input {...register("phone")} placeholder="phone" />
          <Input {...register("streetAddress1")} placeholder="streetAddress1" />
          <Input {...register("city")} placeholder="city" />
          <Input {...register("postalCode")} placeholder="postalCode" />
          <Button variant="outline" onClick={() => setIsEditMode(false)}>
            Close
          </Button>
          <Button type="submit">Save</Button>
        </form>
      ) : (
        <div className="flex flex-col gap-1">
          <div>
            {address.firstName} {address.lastName}
          </div>
          <div>{address.phone}</div>
          <div>{address.streetAddress1},</div>
          <div>
            {address.postalCode} {address.city}
          </div>
          <div className="flex gap-1">
            <Button variant="outline" onClick={() => setIsEditMode(true)}>
              Edit
            </Button>
            <Button>Delete</Button>
          </div>
        </div>
      )}
    </div>
  );
};
