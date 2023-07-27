import { type Media } from "./media";

export type Line = {
  id: string;
  quantity: string;
  variant: {
    name: string;
    pricing: {
      price: {
        gross: {
          amount: string;
          currency: string;
        };
      };
    };
    product: {
      media: Media[];
    };
  };
};
