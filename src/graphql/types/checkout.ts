import { type Line } from "./line";

export type Checkout = {
  created: string;
  email: string;
  totalPrice: {
    gross: {
      amount: string;
      currency: string;
    };
  };
  lines: Line[];
};
