import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
  query ProdcutQuery($slug: String!) {
    product(slug: $slug, channel: "poland") {
      name
      slug
      seoDescription
      description
      media {
        url(format: ORIGINAL)
      }
      rating
      seoTitle
      pricing {
        priceRange {
          start {
            gross {
              amount
            }
          }
        }
      }
        variants {
          sku
        }
    }
  }
`;
