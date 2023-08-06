import React from "react";
import { type MeQuery } from "@/saleor/graphql";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  getDefaultProductImage,
  type Images,
} from "@/utils/get-default-product-image";
import { Separator } from "@/components/ui/separator";

interface CustomerTabProps {
  me: MeQuery;
}

export const OrdersTab = ({ me }: CustomerTabProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {me?.me?.orders?.edges?.map((order) => (
        <div key={order.node.id}>
          {order.node.created}
          <Card className="p-4 w-full flex flex-col gap-3 items-center">
            {order?.node.lines.map((line) => (
              <div key={line.id} className="w-full flex justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={getDefaultProductImage(
                        (line.variant?.product?.media as Images) ?? []
                      )}
                      alt="not yet"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>{line.variant?.product.name}</div>
                </div>
                <div className="flex items-center">
                  {line.quantity} x {line.variant?.pricing?.price?.gross.amount}
                  PLN
                </div>
              </div>
            ))}
            <Separator />
            <div className="self-start">
              Total: {order.node.total.gross.amount} PLN
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};
