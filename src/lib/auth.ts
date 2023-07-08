import { relayStylePagination } from "@apollo/client/utilities";

export const typePolicies = {
  User: {
    fields: {
      orders: relayStylePagination(),
    },
  },
  Query: {
    fields: {
      products: relayStylePagination(["filter", "sortBy"]),
    },
  },
};

export default typePolicies;
