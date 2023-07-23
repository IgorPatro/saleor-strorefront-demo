import React from "react";
import { serverClient } from "@/utils/apolloClient";
import { PRODUCT_QUERY } from "@/graphql/queries/product";
import { renderBlock } from "@/utils/renderMarkdown";

export const getServerSideProps = async (ctx) => {
  const productSlug = ctx.query["productSlug"] as string;

  const { data } = await serverClient.query({
    query: PRODUCT_QUERY,
    variables: {
      slug: productSlug,
    },
  });

  return {
    props: { productSlug, data },
  };
};

const ProductPage = ({ productSlug, data }) => {
  console.log(data);
  const blocks = JSON.parse(data.product.description).blocks.map(
    (block) => block
  );

  console.log(blocks);

  return (
    <div>
      <h1>{data.product.name}</h1>
      <br />
      {/* {blocks.map((block) => renderBlock(block))} */}
      {productSlug}
    </div>
  );
};

export default ProductPage;
