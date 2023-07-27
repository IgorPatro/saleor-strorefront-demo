import { gql } from "@apollo/client";
import { type Error } from "../types/error";

export const CHECKOUT_BILLING_ADDRESS_UPDATE = gql`
  mutation CheckoutBillingAddressUpdate(
    $city: String!
    $streetAddress1: String!
    $postalCode: String!
    $checkoutId: ID!
  ) {
    checkoutBillingAddressUpdate(
      billingAddress: {
        city: $city
        country: PL
        streetAddress1: $streetAddress1
        postalCode: $postalCode
      }
      checkoutId: $checkoutId
    ) {
      checkout {
        id
      }
      errors {
        message
        field
      }
    }
  }
`;

export type CheckoutBillingAddressUpdate = {
  checkoutCreate: {
    checkout: {
      id: string;
    };
    errors: Error[];
  };
};
