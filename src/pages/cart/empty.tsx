import React from "react";
import Link from "next/link";

const CartPageEmpty = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Your cart is empty</h1>
      <p className="text-lg">
        You have no items in your cart. Click <Link href="/">here</Link> to
        continue shopping.
      </p>
    </div>
  );
};

export default CartPageEmpty;
