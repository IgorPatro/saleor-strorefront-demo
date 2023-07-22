import { useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";

import { serverClient } from "@/utils/apolloClient";
import { PRODUCTS_QUERY } from "@/graphql/queries/products";

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

export default function Home({ products }: any) {
  const { data } = useQuery(PRODUCTS_QUERY);
  const session = useSession();

  console.log(session);

  return (
    <div>
      <h1>Hello world!</h1>
    </div>
  );
}
