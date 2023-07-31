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
      billingAddress {
        city
        streetAddress1
        postalCode
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
            name
            media {
              url(format: ORIGINAL)
            }
          }
        }
      }
    }
  }
`);
