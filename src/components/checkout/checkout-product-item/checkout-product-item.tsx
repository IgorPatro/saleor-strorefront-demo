import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Input } from "@/components/ui/input";

import { type CheckoutLine } from "@/saleor/graphql";
import { getDefaultProductImage } from "@/utils/get-default-product-image";

interface ProductCardProps {
  line: CheckoutLine;
}

export const CheckoutProductItem = ({ line }: ProductCardProps) => {
  return (
    <Card className="p-0">
      <CardContent className="flex gap-2 items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="relative w-32 aspect-square rounded-lg overflow-hidden">
            <Image
              src={getDefaultProductImage(line.variant.product.media)}
              alt="not yet"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <p>{line.variant.product.name}</p>
        </div>
        <div className="flex">
          <p>
            {line.quantity} x {line.variant?.pricing?.price?.gross.amount}PLN
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
