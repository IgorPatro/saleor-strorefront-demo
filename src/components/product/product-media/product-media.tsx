import React from "react";
import Image from "next/image";

interface ProductMediaProps {
  images: {
    url: string;
  }[];
}

export const ProductMedia = ({ images }: ProductMediaProps) => {
  const renderImages = () => {
    switch (images.length) {
      case 1: {
        const imageUrl = images[0].url;
        return (
          <Image
            alt="Boat Image"
            src={imageUrl}
            style={{ objectFit: "cover" }}
            width={300}
            height={300}
          />
        );
      }
    }
  };

  return (
    <div className="relative h-64 w-full flex justify-center items-center">
      {renderImages()}
    </div>
  );
};
