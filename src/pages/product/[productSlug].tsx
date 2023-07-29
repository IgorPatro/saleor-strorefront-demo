import React from "react";
import { serverClient } from "@/utils/apolloClient";
import { PRODUCT_QUERY } from "@/graphql/queries/product";
import { GetServerSideProps } from "next";

import { type ProdcutQuery } from "@/saleor/graphql";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

interface ProductPageProps {
  productSlug: string;
  productData: ProdcutQuery;
}

const ProductPage = ({ productSlug, productData }: ProductPageProps) => {
  console.log(productData);
  const blocks = JSON.parse(productData.product?.description).blocks.map(
    (block: any) => block
  );

  console.log(blocks);

  return (
    <div>
      <h1>{productData.product?.name}</h1>
      <br />
      {/* {blocks.map((block) => renderBlock(block))} */}
      {productSlug}
    </div>
  );
};

export default ProductPage;
