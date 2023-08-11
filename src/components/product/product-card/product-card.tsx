import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { type Product } from "@/saleor/graphql";
import { getDefaultProductImage } from "@/utils/get-default-product-image";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (variantId: string) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>
            {product.defaultVariant?.pricing?.price?.gross.amount} PLN
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={getDefaultProductImage(product.media)}
            alt="not yet"
            width={300}
            height={500}
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart && onAddToCart(product.defaultVariant?.id ?? "");
            }}
          >
            Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
