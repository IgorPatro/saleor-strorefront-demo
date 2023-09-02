import React from "react";
import { type Product } from "@/saleor/graphql";
import { ProductCard } from "@/components/product/product-card";

interface ProductsListProps {
  label: React.ReactNode;
  products: Product[];
}

export const ProductsList = ({ label, products }: ProductsListProps) => {
  return (
    <div>
      {label}
      <div className="flex gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            // onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};
