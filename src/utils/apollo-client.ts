import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: "http://localhost:8000/graphql/",
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();

  const modifiedHeader = {
    headers: {
      ...headers,
      authorization: session?.token ? `Bearer ${session.token}` : "",
    },
  };
  return modifiedHeader;
});

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export const serverClient = new ApolloClient({
  link: createHttpLink({
    uri: "http://localhost:8000/graphql/",
    credentials: "same-origin",
    headers: { Authorization: "Bearer t8jEmbLXJEL4BfU3p6Rvr7tMOAV2cN" },
  }),
  cache: new InMemoryCache(),
  ssrMode: true,
});
