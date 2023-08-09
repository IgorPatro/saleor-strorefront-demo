import React from "react";
import { type Address } from "@/saleor/graphql";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ACCOUNT_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/account/account-address-update";
import { ACCOUNT_ADDRESS_DELETE_MUTATION } from "@/graphql/mutations/account/account-address-delete";
import { ACCOUNT_SET_DEFAULT_ADDRESS_MUTATION } from "@/graphql/mutations/account/account-set-default-address";
import { ME_QUERY } from "@/graphql/queries/me";
import { useMutation, useApolloClient } from "@apollo/client";
import { AddressTypeEnum } from "@/saleor/graphql";

import { useAddressForm } from "../hooks";
import { type AddressFormInterface } from "../types";

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
  const [setDefaultAddress] = useMutation(ACCOUNT_SET_DEFAULT_ADDRESS_MUTATION);

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

  const onMakeDefaultAddress = async (addressId: string) => {
    await setDefaultAddress({
      variables: {
        addressId,
        type: AddressTypeEnum.Billing,
      },
    });

    await setDefaultAddress({
      variables: {
        addressId,
        type: AddressTypeEnum.Shipping,
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
          {address.isDefaultBillingAddress ? (
            <p className="font-bold">Default</p>
          ) : null}
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
            {address.isDefaultBillingAddress ? null : (
              <Button
                disabled={isDeleteMutationLoading}
                onClick={() => onMakeDefaultAddress(address.id)}
                variant="outline"
              >
                Make default
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
