import Image from "next/image";
import React from "react";

interface ProductProps {
  productName: string;
  imageSrc: string;
}

const ProductCard = ({ productName, imageSrc }: ProductProps) => {
  return (
    <>
      <div className="w-64 bg-slate-100 p-4 h-96">
        <h2>{productName}</h2>
        <Image src={imageSrc} alt="not yet" width={300} height={500} />
      </div>
    </>
  );
};

export default ProductCard;
