import { gql } from "@apollo/client";

export const MARK_ORDER_PAID = gql`
  mutation MarkOrderPaid($orderId: ID!) {
    orderMarkAsPaid(id: $orderId) {
      order {
        id
      }
    }
  }
`;
