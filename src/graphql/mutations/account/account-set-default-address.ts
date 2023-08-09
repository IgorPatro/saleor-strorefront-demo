import { gql } from "@/saleor/gql";

export const ACCOUNT_SET_DEFAULT_ADDRESS_MUTATION = gql(`
  mutation AccountSetDefaultAddress($addressId: ID!, $type: AddressTypeEnum!) {
    accountSetDefaultAddress(
      id: $addressId,
      type: $type
    ) {
      user {
        id
      }
      errors {
        field
        message
      }
    }
  }
`);
