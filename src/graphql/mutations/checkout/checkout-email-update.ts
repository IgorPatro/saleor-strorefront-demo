import { gql } from "@/saleor/gql";

export const CHECKOUT_EMAIL_UPDATE_MUTATION = gql(`
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
`);
