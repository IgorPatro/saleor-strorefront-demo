import { gql } from "@apollo/client";
import { type Checkout } from "@/graphql/types/checkout";
import { type Error } from "@/graphql/types/error";

export const CHECKOUT_QUERY = gql`
  query CheckoutQuery($checkoutId: ID!) {
    checkout(id: $checkoutId) {
      created
      email
      totalPrice {
        gross {
          amount
          currency
        }
      }
      lines {
        id
        quantity
        variant {
          name
          pricing {
            price {
              gross {
                amount
                currency
              }
            }
          }
          product {
            media {
              url(format: ORIGINAL)
            }
          }
        }
      }
    }
  }
`;

export type CheckoutQuery = {
  checkout: Checkout;
};
