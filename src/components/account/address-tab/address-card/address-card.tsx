import React from "react";
import { type Address } from "@/saleor/graphql";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCOUNT_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/account/account-address-update";
import { ACCOUNT_ADDRESS_DELETE_MUTATION } from "@/graphql/mutations/account/account-address-delete";
import { ME_QUERY } from "@/graphql/queries/me";
import { useMutation, useApolloClient } from "@apollo/client";

import { useAddressForm } from "../hooks";
import { AddressFormSchema, type AddressFormInterface } from "../types";

interface AddressCardProps {
  address: Address;
}

export const AddressCard = ({ address }: AddressCardProps) => {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const client = useApolloClient();

  const { register, handleSubmit } = useAddressForm(address);

  const [updateAddress] = useMutation(ACCOUNT_ADDRESS_UPDATE_MUTATION);
  const [deleteAddress, { loading: isDeleteMutationLoading }] = useMutation(
    ACCOUNT_ADDRESS_DELETE_MUTATION
  );

  const onSubmit = async (values: AddressFormInterface) => {
    await updateAddress({
      variables: {
        addressId: address.id,
        ...values,
      },
    });

    setIsEditMode(false);

    return await client.refetchQueries({
      include: [ME_QUERY],
    });
  };

  const onAddressDelete = async (addressId: string) => {
    await deleteAddress({
      variables: {
        addressId,
      },
    });

    return await client.refetchQueries({
      include: [ME_QUERY],
    });
  };

  return (
    <div key={address.id}>
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
            <Button
              disabled={isDeleteMutationLoading}
              onClick={() => onAddressDelete(address.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
