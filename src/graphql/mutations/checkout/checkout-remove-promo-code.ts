import { gql } from "@/saleor/gql";

export const CHECKOUT_REMOVE_PROMO_CODE_MUTATION = gql(`
  mutation CheckoutRemovePromoCode($promoCode: String!, $checkoutId: ID!) {
    checkoutRemovePromoCode(
      promoCode: $promoCode
      checkoutId: $checkoutId
    ) {
      checkout {
        id
      }
      errors {
        field
        message
      }
    }
  }
`);
