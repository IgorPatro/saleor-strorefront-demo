import { gql } from "@/saleor/gql";

export const CHECKOUT_CREATE_MUTATION = gql(`
  mutation CheckoutCreate($quantity: Int = 1, $variantId: ID!) {
    checkoutCreate(
      input: { lines: { quantity: $quantity, variantId: $variantId } }
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
