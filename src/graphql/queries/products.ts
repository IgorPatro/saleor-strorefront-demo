import { gql } from "@/saleor/gql";

export const PRODUCTS_QUERY = gql(`
  query Products($first: Int = 10) {
    products(first: $first, channel: "default") {
      edges {
        node {
          id
          slug
          name
          media {
            url(format: ORIGINAL)
          }
          defaultVariant {
            id
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`);
