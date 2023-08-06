import { gql } from "@/saleor/gql";

export const USER_UPDATE_MUTATION = gql(`
  mutation UserUpdate($firstName: String, $lastName: String) {
    accountUpdate(
      input: { firstName: $firstName, lastName: $lastName }
    ) {
      user {
        id
      }
      errors {
        field
        message
      }
    }
  }
`);
