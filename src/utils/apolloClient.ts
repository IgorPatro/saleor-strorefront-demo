import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/",
  cache: new InMemoryCache(),
  headers: { Authorization: "Bearer t8jEmbLXJEL4BfU3p6Rvr7tMOAV2cN" },
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
