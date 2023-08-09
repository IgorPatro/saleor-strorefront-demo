import { gql } from "@/saleor/gql";

export const ACCOUNT_ADDRESS_CREATE_MUTATION = gql(`
  mutation AccountAddressCreate($city: String, $firstName: String, $lastName: String, $phone: String, $postalCode: String, $streetAddress1: String) {
    accountAddressCreate(
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
