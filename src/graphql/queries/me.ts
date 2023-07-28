import { gql } from "@/saleor/gql";

export const ME_QUERY = gql(`
  query Me {
    me {
      id
      email
      firstName
      lastName
    }
  }
`);
