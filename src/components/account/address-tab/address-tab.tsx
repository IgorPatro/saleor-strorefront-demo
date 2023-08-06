import React from "react";
import { Input } from "@/components/ui/input";
import { type Address, type MeQuery } from "@/saleor/graphql";
import { Button } from "@/components/ui/button";
import { useMutation, useApolloClient } from "@apollo/client";
import { ACCOUNT_ADDRESS_CREATE_MUTATION } from "@/graphql/mutations/account/account-address-create";
import { ME_QUERY } from "@/graphql/queries/me";

import { AddressCard } from "./address-card";
import { useAddressForm } from "./hooks";
import { type AddressFormInterface } from "./types";

interface CustomerTabProps {
  me: MeQuery;
}

export const AddressTab = ({ me }: CustomerTabProps) => {
  const [isAddAddressMode, setIsAddAddressMode] = React.useState(false);
  const addresses = me?.me?.addresses ?? [];
  const client = useApolloClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useAddressForm();

  const [createAddress] = useMutation(ACCOUNT_ADDRESS_CREATE_MUTATION);

  const onSubmit = async (values: AddressFormInterface) => {
    await createAddress({
      variables: {
        ...values,
      },
    });

    await client.refetchQueries({
      include: [ME_QUERY],
    });

    reset();
    return setIsAddAddressMode(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={() => setIsAddAddressMode((prevState) => !prevState)}>
        Add new address
      </Button>
      {isAddAddressMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("firstName")} placeholder="firstName" />
          <Input {...register("lastName")} placeholder="lastName" />
          <Input {...register("phone")} placeholder="phone" />
          <Input {...register("streetAddress1")} placeholder="streetAddress1" />
          <Input {...register("city")} placeholder="city" />
          <Input {...register("postalCode")} placeholder="postalCode" />
          <Button type="submit" disabled={isSubmitting}>
            Add
          </Button>
        </form>
      ) : null}
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address as Address} />
      ))}
    </div>
  );
};
