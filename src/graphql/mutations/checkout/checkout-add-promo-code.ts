import { gql } from "@/saleor/gql";

export const CHECKOUT_ADD_PROMO_CODE_MUTATION = gql(`
  mutation CheckoutAddPromoCode($promoCode: String!, $checkoutId: ID!) {
    checkoutAddPromoCode(
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
