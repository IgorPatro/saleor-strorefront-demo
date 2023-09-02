import React from "react";
import { serverClient } from "@/utils/apollo-client";
import { PRODUCT_QUERY } from "@/graphql/queries/product";
import { GetServerSideProps } from "next";

import { type ProductQuery } from "@/saleor/graphql";
import { renderMarkdown } from "@/utils/render-markdown";
import { ProductMedia } from "@/components/product/product-media";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useCart } from "@/hooks/use-cart";

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
  const [selectedVariantId, setSelectedVariantId] = React.useState<string>(
    productData.product?.variants?.[0].id ??
      productData.product?.defaultVariant?.id ??
      ""
  );

  const { handleAddToCart } = useCart();

  return (
    <div className="flex gap-10">
      <ProductMedia images={productData.product?.media ?? []} />
      <div className="w-full flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{productData.product?.name}</h1>
        <RadioGroup
          value={selectedVariantId}
          onValueChange={(newVariantId) => setSelectedVariantId(newVariantId)}
        >
          {productData.product?.variants?.map((variant) => (
            <div
              key={variant.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <RadioGroupItem value={variant.id} id={variant.id} />
              <Label className="cursor-pointer" htmlFor={variant.id}>
                {variant.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div>{renderMarkdown(productData.product?.description)}</div>
        <Button
          className="self-start"
          onClick={() => handleAddToCart(selectedVariantId)}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
