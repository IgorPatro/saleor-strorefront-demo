import { gql } from "@/saleor/gql";

export const CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION = gql(`
  mutation CheckoutShippingAddressUpdate(
    $checkoutId: ID!
    $firstName: String
    $lastName: String
    $phone: String
    $city: String!
    $streetAddress1: String!
    $postalCode: String!
    $streetAddress2: String
  ) {
    checkoutShippingAddressUpdate(
      shippingAddress: {
        country: PL
        firstName: $firstName
        lastName: $lastName
        phone: $phone
        city: $city
        streetAddress1: $streetAddress1
        streetAddress2: $streetAddress2
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
