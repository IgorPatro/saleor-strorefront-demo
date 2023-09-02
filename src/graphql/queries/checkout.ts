import { gql } from "@/saleor/gql";

export const CHECKOUT_QUERY = gql(`
  query Checkout($checkoutId: ID!) {
    checkout(id: $checkoutId) {
      created
      email
      totalPrice {
        gross {
          amount
          currency
        }
      }
      subtotalPrice {
        gross {
          amount
        }
      }
      shippingPrice {
        gross {
          amount
        }
      }
      discount {
        amount
      }
      voucherCode
      billingAddress {
        phone
        firstName
        lastName
        city
        streetAddress1
        postalCode
        companyName
      }
      shippingAddress {
        phone
        firstName
        lastName
        city
        streetAddress1
        postalCode
      }
      lines {
        id
        quantity
        totalPrice {
          gross {
            amount
            currency
          }
        }
        variant {
          name
          pricing {
            price {
              gross {
                amount
                currency
              }
            }
          }
          product {
            name
            media {
              url(format: ORIGINAL)
            }
          }
        }
      }
      isShippingRequired
      shippingMethods {
        name
        id
        metafields
        price {
          amount
        }
      }
    }
  }
`);
