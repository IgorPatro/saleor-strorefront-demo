import { gql } from "@/saleor/gql";

export const PRODUCT_QUERY = gql(`
  query Product($slug: String!) {
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
`);
