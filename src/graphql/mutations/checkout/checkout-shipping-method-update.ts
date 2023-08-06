import { gql } from "@/saleor/gql";

export const CHECKOUT_SHIPPING_METHOD_UPDATE_MUTATION = gql(`
  mutation CheckoutShippingMethodUpdate(
    $shippingMethodId: ID!
    $checkoutId: ID!
  ) {
    checkoutShippingMethodUpdate(
      shippingMethodId: $shippingMethodId
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
