import { gql } from "@apollo/client";
import { type Product } from "@/graphql/types/product";

export const PRODUCTS_QUERY = gql`
  query ProductsQuery($first: Int = 10) {
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
`;

export type ProductsQuery = {
  products: {
    edges: {
      node: Product;
    };
  };
};
