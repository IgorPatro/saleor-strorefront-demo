import { gql } from "@apollo/client";

export const SIGNIN_MUTATION = gql`
  mutation SignIn($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      errors {
        field
        message
      }
      user {
        email
        firstName
        lastName
      }
    }
  }
`;
