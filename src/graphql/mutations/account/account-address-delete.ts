import { gql } from "@/saleor/gql";

export const ACCOUNT_ADDRESS_DELETE_MUTATION = gql(`
  mutation AccountAddressDelete($addressId: ID!) {
    accountAddressDelete(
      id: $addressId
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
