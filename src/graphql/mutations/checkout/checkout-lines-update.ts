import { gql } from "@/saleor/gql";

export const CHECKOUT_LINES_UPDATE_MUTATION = gql(`
  mutation CheckoutLinesUpdate($lineId: ID!, $quantity: Int = 1, $checkoutId: ID!) {
    checkoutLinesUpdate(
      lines: { lineId: $lineId, quantity: $quantity }
      checkoutId: $checkoutId
    ) {
      checkout {
        id
      }
      errors {
        field
        message
        code
      }
    }
  }
`);
