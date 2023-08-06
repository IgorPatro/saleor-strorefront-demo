import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CartSummaryProps {
  totalPrice: number;
  isDisabled?: boolean;
  onGenerateOrder: () => void;
}

export const CartSummary = ({
  isDisabled,
  totalPrice,
  onGenerateOrder,
}: CartSummaryProps) => {
  return (
    <Card className="flex flex-col gap-2 min-w-[15rem] p-4">
      <div>
        <h1>Total: {totalPrice}PLN</h1>
      </div>
      <Button onClick={onGenerateOrder} disabled={isDisabled}>
        Make an order
      </Button>
    </Card>
  );
};
