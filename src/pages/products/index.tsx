import React from "react";
import { gql } from "@apollo/client";
import client from "../../lib/apollo-client";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Products {
        products(first: 10) {
          name
          id
          description
          slug
        }
      }
    `,
  });

  return {
    props: {
      products: data.allProducts.edges
        .map((edge: any) => edge.node)
        .slice(0, 4),
    },
  };
}

const index = ({ products }: any) => {
  return <div>index</div>;
  <div>
    {products.map((product: any) => (
      <div key={product.name}>
        <h3>{product.slug}</h3>
      </div>
    ))}
  </div>;
};

export default index;
