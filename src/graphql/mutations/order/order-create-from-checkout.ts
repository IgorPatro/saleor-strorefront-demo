import { gql } from "@/saleor/gql";

export const ORDER_CREATE_FROM_CHECKOUT_MUTATION = gql(`
  mutation OrderCreateFromCheckout($checkoutId: ID!) {
    orderCreateFromCheckout(id: $checkoutId) {
      order {
        status
        id
        total {
          gross {
            amount
            currency
          }
          net {
            amount
            currency
          }
        }
        user {
          email
        }
      }
      errors {
        field
        message
      }
    }
  }
`);
