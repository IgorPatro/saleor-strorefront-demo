import { gql } from "@apollo/client";
import { type Error } from "../types/error";

export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($quantity: Int = 1, $variantId: ID!) {
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
`;

export type CreateCheckout = {
  checkoutCreate: {
    checkout: {
      id: string;
    };
    errors: Error[];
  };
};
