import { gql } from "@apollo/client";
import { type Order } from "@/graphql/types/order";
import { type Error } from "@/graphql/types/error";

export const CREATE_ORDER_FROM_CHECKOUT = gql`
  mutation CreateOrderFromCheckout($checkoutId: ID!) {
    orderCreateFromCheckout(id: $checkoutId, removeCheckout: false) {
      order {
        status
        id
        total {
          gross {
            amount
            currency
          }
          net {
            amount
            currency
          }
        }
        user {
          email
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export type CreateCheckoutFromQuery = {
  orderCreateFromCheckout: {
    order: Order;
    errors: Error[];
  };
};
