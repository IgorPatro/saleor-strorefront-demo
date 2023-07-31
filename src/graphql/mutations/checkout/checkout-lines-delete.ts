import { gql } from "@/saleor/gql";

export const CHECKOUT_LINES_DELETE_MUTATION = gql(`
  mutation CheckoutLinesDelete($lineId: ID!, $checkoutId: ID!) {
    checkoutLinesDelete(
      linesIds: [$lineId]
      id: $checkoutId
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
