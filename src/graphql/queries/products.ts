import { gql } from "@apollo/client";

export const PRODUCTS_QUERY = gql`
  query ProductsQuery($first: Int = 10) {
    products(first: $first) {
      edges {
        node {
          id
          slug
          name
          media {
            url(format: ORIGINAL)
          }
        }
      }
    }
  }
`;
