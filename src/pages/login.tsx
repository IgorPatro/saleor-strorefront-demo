import React from "react";
import { gql, useMutation } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      errors {
        field
        message
      }
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    accountRegister(
      input: {
        email: $email
        password: $password
        redirectUrl: "https://localhost:3000"
      }
    ) {
      errors {
        field
        message
      }
      user {
        email
      }
      requiresConfirmation
    }
  }
`;

const LoginPage = () => {
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: "test@gmail.com",
      password: "pass12345678",
    },
  });

  const [register] = useMutation(REGISTER_MUTATION, {
    variables: {
      email: "test@gmail.com",
      password: "pass12345678",
    },
  });

  return (
    <div>
      LoginPage
      <br />
      <button onClick={() => login()}>Login</button>
      <button onClick={() => register()}>Register</button>
    </div>
  );
};

export default LoginPage;
