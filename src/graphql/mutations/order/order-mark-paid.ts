import { gql } from "@/saleor/gql";

export const ORDER_MARK_PAID_MUTATION = gql(`
  mutation OrderMarkPaid($orderId: ID!) {
    orderMarkAsPaid(id: $orderId) {
      order {
        id
      }
    }
  }
`);
