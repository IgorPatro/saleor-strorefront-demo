import { type Product } from "@/saleor/graphql";

type Images = Product["media"];

export const getDefaultProductImage = (images: Images) => {
  if (!images || images.length === 0) {
    return "";
  }

  return images[0].url;
};
