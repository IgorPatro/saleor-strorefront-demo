import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Input } from "@/components/ui/input";

import { type CheckoutLine } from "@/saleor/graphql";
import { useCart } from "@/hooks/use-cart";
import { getDefaultProductImage } from "@/utils/get-default-product-image";

interface ProductCardProps {
  line: CheckoutLine;
}

export const CartProductItem = ({ line }: ProductCardProps) => {
  const { handleUpdateProductQuantity, handleDeleteProduct } = useCart();

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
          <p>
            {line.variant.product.name}, {line.variant.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            className="w-20"
            defaultValue={line.quantity}
            onChange={(e) =>
              handleUpdateProductQuantity(Number(e.target.value), line.id)
            }
          />
          <button
            onClick={() => handleDeleteProduct(line.id)}
            className="p-2 inline-flex justify-center items-center"
          >
            <RiDeleteBin6Fill className="w-6 h-6" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
