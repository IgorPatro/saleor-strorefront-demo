import { gql } from "@/saleor/gql";

export const CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION = gql(`
  mutation CheckoutBillingAddressUpdate(
    $checkoutId: ID!
    $firstName: String!
    $lastName: String!
    $companyName: String!
    $phone: String!
    $city: String!
    $streetAddress1: String!
    $postalCode: String!
  ) {
    checkoutBillingAddressUpdate(
      billingAddress: {
        country: PL
        firstName: $firstName
        lastName: $lastName
        companyName: $companyName
        phone: $phone
        city: $city
        streetAddress1: $streetAddress1
        postalCode: $postalCode
      }
      checkoutId: $checkoutId
    ) {
      checkout {
        id
      }
      errors {
        message
        field
      }
    }
  }
`);
