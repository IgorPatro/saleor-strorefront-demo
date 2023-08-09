import { gql } from "@/saleor/gql";

export const ACCOUNT_ADDRESS_UPDATE_MUTATION = gql(`
  mutation AccountAddressUpdate($addressId: ID!, $city: String, $firstName: String, $lastName: String, $phone: String, $postalCode: String, $streetAddress1: String) {
    accountAddressUpdate(
      id: $addressId,
      input: {
        firstName: $firstName,
        lastName: $lastName,
        phone: $phone,
        postalCode: $postalCode,
        streetAddress1: $streetAddress1
        city: $city,
        country: PL
      }
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
