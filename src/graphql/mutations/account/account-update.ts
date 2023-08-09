import { gql } from "@/saleor/gql";

export const ACCOUNT_UPDATE_MUTATION = gql(`
  mutation AccountUpdate($firstName: String, $lastName: String) {
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
