import { gql } from "@/saleor/gql";

export const ME_QUERY = gql(`
  query Me {
    me {
      id
      email
      firstName
      lastName
      checkout {
        id
      }
      addresses {
        id
        city
        postalCode
        streetAddress1
        firstName
        lastName
        phone
      }
    }
  }
`);
