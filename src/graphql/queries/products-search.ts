import { gql } from "@/saleor/gql";

export const PRODUCTS_SEARCH_QUERY = gql(`
  query ProductsSearch($first: Int = 10, $search: String!) {
    products(first: $first, channel: "default", search: $search) {
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
