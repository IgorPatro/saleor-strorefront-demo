import React from "react";
import { serverClient } from "@/utils/apollo-client";
import { PRODUCT_QUERY } from "@/graphql/queries/product";
import { GetServerSideProps } from "next";

import { type ProductQuery } from "@/saleor/graphql";
import { renderMarkdown } from "@/utils/render-markdown";
import { ProductMedia } from "@/components/product/product-media";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const productSlug = ctx.query["productSlug"] as string;

  const { data: productData } = await serverClient.query({
    query: PRODUCT_QUERY,
    variables: {
      slug: productSlug,
    },
  });

  return {
    props: { productSlug, productData },
  };
};

interface ProductPageProps {
  productSlug: string;
  productData: ProductQuery;
}

const ProductPage = ({ productSlug, productData }: ProductPageProps) => {
  return (
    <div className="flex gap-10">
      <ProductMedia images={productData.product?.media ?? []} />
      <div className="w-full">
        <h1 className="text-3xl font-bold">{productData.product?.name}</h1>
        {renderMarkdown(productData.product?.description)}
      </div>
    </div>
  );
};

export default ProductPage;
