import { type CheckoutLine } from "@/saleor/graphql";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { getDefaultProductImage } from "@/utils/get-default-product-image";

interface CartTableProps {
  lines: CheckoutLine[];
}

export const CartTable = ({ lines }: CartTableProps) => {
  const { handleUpdateProductQuantity, handleDeleteProduct } = useCart();

  return (
    <table className="w-full border-b border-black">
      <tr className="border-b border-black">
        <th className="text-start pb-3 font-thin">PRODUKT</th>
        <th className="text-center pb-3 font-thin">ILOŚĆ</th>
        <th className="text-end pb-3 font-thin">CENA</th>
      </tr>
      {lines.map((line) => (
        <tr key={line.id}>
          <td className="flex items-center gap-2 py-3">
            <div className="relative w-32 aspect-square rounded-lg overflow-hidden">
              <Image
                src={getDefaultProductImage(line.variant.product.media)}
                alt="not yet"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <p>{line.variant.product.name}</p>
              <p>{line.variant.pricing?.price?.gross.amount} PLN</p>
            </div>
          </td>
          <td className="text-center py-3">
            <div className="flex flex-col justify-center items-center gap-2">
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
                className="p-2 inline-flex justify-center items-center uppercase underline"
              >
                usuń
              </button>
            </div>
          </td>
          <td className="text-end py-3">{line.totalPrice.gross.amount}</td>
        </tr>
      ))}
    </table>
  );
};
