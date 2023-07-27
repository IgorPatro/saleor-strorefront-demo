export type Order = {
  id: string;
  status: string;
  total: {
    gross: {
      amount: string;
      currency: string;
    };
    net: {
      amount: string;
      currency: string;
    };
  };
  user: {
    email: string;
  };
};
