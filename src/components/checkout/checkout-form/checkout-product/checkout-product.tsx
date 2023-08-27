import React from "react";
import { type CheckoutLine } from "@/saleor/graphql";
import Image from "next/image";
import { getDefaultProductImage } from "@/utils/get-default-product-image";

interface CheckoutProductProps {
  line: CheckoutLine;
}

export const CheckoutProduct = ({ line }: CheckoutProductProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="relative">
        <div className="absolute -top-2 -right-2 rounded-full bg-gray-300 w-5 h-5 flex justify-center items-center">
          {line.quantity}
        </div>
        <Image
          src={getDefaultProductImage(line.variant.product.media)}
          alt={"TAK"}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col">
        <span>{line.variant.product.name}</span>
        <span>{line.variant.pricing?.price?.gross.amount}PLN</span>
      </div>
    </div>
  );
};
