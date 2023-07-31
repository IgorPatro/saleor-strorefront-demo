import { gql } from "@/saleor/gql";

export const ORDER_QUERY = gql(`
  query Order($orderId: ID!) {
    order(id: $orderId) {
      created
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
