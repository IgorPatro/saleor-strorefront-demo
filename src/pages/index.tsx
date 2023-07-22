import { useQuery } from "@apollo/client";

import { serverClient } from "../utils/apolloClient";
import { PRODUCTS_QUERY } from "../graphql/products";

export const getServerSideProps = async () => {
  const { data } = await serverClient.query({
    query: PRODUCTS_QUERY,
  });

  return {
    props: {
      products: data?.products.edges,
    },
  };
};

export default function Home({ products }) {
  const { data } = useQuery(PRODUCTS_QUERY);

  console.log("PRODUCTS Server", products);
  console.log("PRODUCTS", data?.products.edges);

  return (
    <div>
      <h1>Hello world!</h1>
    </div>
  );
}
