import { gql } from "@/saleor/gql";

export const CHECKOUT_QUERY = gql(`
  query Checkout($checkoutId: ID!) {
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
`);
