import { gql } from "@/saleor/gql";

export const CHECKOUT_LINES_ADD_MUTATION = gql(`
  mutation CheckoutLinesAdd(
    $quantity: Int = 1
    $variantId: ID!
    $checkoutId: ID!
  ) {
    checkoutLinesAdd(
      lines: { quantity: $quantity, variantId: $variantId }
      checkoutId: $checkoutId
    ) {
      checkout {
        id
      }
      errors {
        field
        message
      }
    }
  }
`);
