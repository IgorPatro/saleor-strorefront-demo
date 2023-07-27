import { gql } from "@apollo/client";
import { type Error } from "../types/error";

export const CHECKOUT_EMAIL_UPDATE = gql`
  mutation CheckoutEmailUpdate($checkoutId: ID!, $email: String!) {
    checkoutEmailUpdate(email: $email, checkoutId: $checkoutId) {
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

export type CheckoutEmailUpdate = {
  checkoutEmailUpdate: {
    checkout: {
      id: string;
    };
    errors: Error[];
  };
};
