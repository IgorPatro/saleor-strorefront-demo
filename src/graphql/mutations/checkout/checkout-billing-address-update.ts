import { gql } from "@/saleor/gql";

export const CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION = gql(`
  mutation CheckoutBillingAddressUpdate(
    $city: String!
    $streetAddress1: String!
    $postalCode: String!
    $checkoutId: ID!
  ) {
    checkoutBillingAddressUpdate(
      billingAddress: {
        city: $city
        country: PL
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
