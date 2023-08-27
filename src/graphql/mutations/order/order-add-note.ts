import { gql } from "@/saleor/gql";

export const ORDER_ADD_NOTE_MUTATION = gql(`
  mutation OrderAddNote($orderId: ID!, $message: String!) {
    orderAddNote(input: {message: $message}, order: $orderId) {
      order {
        id
      }
      errors {
        field
        message
      }
    }
  }
`);
