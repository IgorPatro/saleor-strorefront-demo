import { type Media } from "./media";

export type Product = {
  id: string;
  slug: string;
  name: string;
  media: Media[];
  defaultVariant: {
    id: string;
    pricing: {
      price: {
        gross: {
          amount: string;
          currency: string;
        };
      };
    };
  };
};
