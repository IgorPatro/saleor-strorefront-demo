import { gql } from "@/saleor/gql";

export const CHECKOUT_SHIPPING_ADDRESS_UPDATE_MUTATION = gql(`
  mutation CheckoutShippingAddressUpdate(
    $city: String!
    $streetAddress1: String!
    $postalCode: String!
    $checkoutId: ID!
  ) {
    checkoutShippingAddressUpdate(
      shippingAddress: {
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
