import { gql } from "@apollo/client";
import { type Error } from "../types/error";

export const CHECKOUT_LINES_ADD = gql`
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
`;

export type CheckoutLinesAdd = {
  checkoutLinesAdd: {
    checkout: {
      id: string;
    };
    errors: Error[];
  };
};
