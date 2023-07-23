import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
  query ProdcutQuery($slug: String!) {
    product(slug: $slug) {
      name
      slug
      seoDescription
      description
      media {
        url(format: ORIGINAL)
      }
    }
  }
`;
