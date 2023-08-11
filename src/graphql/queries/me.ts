import { gql } from "@/saleor/gql";

export const ME_QUERY = gql(`
  query Me {
    me {
      id
      email
      firstName
      lastName
      checkout {
        id
      }
      addresses {
        id
        city
        postalCode
        streetAddress1
        firstName
        lastName
        phone
        isDefaultBillingAddress
        isDefaultShippingAddress
      }
      orders(first: 10) {
        edges {
          node {
            id
            status
            created
            total {
              gross {
                amount
              }
            }
            paymentStatus
            lines {
              id
              quantity
              variant {
                pricing {
                  price {
                    gross {
                      amount
                      currency
                    }
                  }
                }
                product {
                  media {
                    id
                    url(format: ORIGINAL)
                  }
                  name
                }
                name
              }
            }
            isPaid
          }
        }
      }
      defaultBillingAddress {
        city
        firstName
        lastName
        phone
        streetAddress1
        postalCode
      }
      defaultShippingAddress {
        city
        firstName
        lastName
        phone
        streetAddress1
        postalCode
      }
    }
  }
`);
