/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CheckoutBillingAddressUpdate(\n    $city: String!\n    $streetAddress1: String!\n    $postalCode: String!\n    $checkoutId: ID!\n  ) {\n    checkoutBillingAddressUpdate(\n      billingAddress: {\n        city: $city\n        country: PL\n        streetAddress1: $streetAddress1\n        postalCode: $postalCode\n      }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n": types.CheckoutBillingAddressUpdateDocument,
    "\n  mutation CheckoutCreate($quantity: Int = 1, $variantId: ID!) {\n    checkoutCreate(\n      input: { lines: { quantity: $quantity, variantId: $variantId } }\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.CheckoutCreateDocument,
    "\n  mutation CheckoutEmailUpdate($checkoutId: ID!, $email: String!) {\n    checkoutEmailUpdate(email: $email, checkoutId: $checkoutId) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.CheckoutEmailUpdateDocument,
    "\n  mutation CheckoutLinesAdd(\n    $quantity: Int = 1\n    $variantId: ID!\n    $checkoutId: ID!\n  ) {\n    checkoutLinesAdd(\n      lines: { quantity: $quantity, variantId: $variantId }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.CheckoutLinesAddDocument,
    "\n  mutation OrderCreateFromCheckout($checkoutId: ID!) {\n    orderCreateFromCheckout(id: $checkoutId, removeCheckout: false) {\n      order {\n        status\n        id\n        total {\n          gross {\n            amount\n            currency\n          }\n          net {\n            amount\n            currency\n          }\n        }\n        user {\n          email\n        }\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.OrderCreateFromCheckoutDocument,
    "\n  mutation OrderMarkPaid($orderId: ID!) {\n    orderMarkAsPaid(id: $orderId) {\n      order {\n        id\n      }\n    }\n  }\n": types.OrderMarkPaidDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        field\n        message\n      }\n      user {\n        email\n        firstName\n        lastName\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  query Checkout($checkoutId: ID!) {\n    checkout(id: $checkoutId) {\n      created\n      email\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n      lines {\n        id\n        quantity\n        variant {\n          name\n          pricing {\n            price {\n              gross {\n                amount\n                currency\n              }\n            }\n          }\n          product {\n            media {\n              url(format: ORIGINAL)\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CheckoutDocument,
    "\n  query Me {\n    me {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.MeDocument,
    "\n  query Prodcut($slug: String!) {\n    product(slug: $slug) {\n      name\n      slug\n      seoDescription\n      description\n      media {\n        url(format: ORIGINAL)\n      }\n    }\n  }\n": types.ProdcutDocument,
    "\n  query Products($first: Int = 10) {\n    products(first: $first, channel: \"default\") {\n      edges {\n        node {\n          id\n          slug\n          name\n          media {\n            url(format: ORIGINAL)\n          }\n          defaultVariant {\n            id\n            pricing {\n              price {\n                gross {\n                  amount\n                  currency\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.ProductsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CheckoutBillingAddressUpdate(\n    $city: String!\n    $streetAddress1: String!\n    $postalCode: String!\n    $checkoutId: ID!\n  ) {\n    checkoutBillingAddressUpdate(\n      billingAddress: {\n        city: $city\n        country: PL\n        streetAddress1: $streetAddress1\n        postalCode: $postalCode\n      }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CheckoutBillingAddressUpdate(\n    $city: String!\n    $streetAddress1: String!\n    $postalCode: String!\n    $checkoutId: ID!\n  ) {\n    checkoutBillingAddressUpdate(\n      billingAddress: {\n        city: $city\n        country: PL\n        streetAddress1: $streetAddress1\n        postalCode: $postalCode\n      }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CheckoutCreate($quantity: Int = 1, $variantId: ID!) {\n    checkoutCreate(\n      input: { lines: { quantity: $quantity, variantId: $variantId } }\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CheckoutCreate($quantity: Int = 1, $variantId: ID!) {\n    checkoutCreate(\n      input: { lines: { quantity: $quantity, variantId: $variantId } }\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CheckoutEmailUpdate($checkoutId: ID!, $email: String!) {\n    checkoutEmailUpdate(email: $email, checkoutId: $checkoutId) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CheckoutEmailUpdate($checkoutId: ID!, $email: String!) {\n    checkoutEmailUpdate(email: $email, checkoutId: $checkoutId) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CheckoutLinesAdd(\n    $quantity: Int = 1\n    $variantId: ID!\n    $checkoutId: ID!\n  ) {\n    checkoutLinesAdd(\n      lines: { quantity: $quantity, variantId: $variantId }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CheckoutLinesAdd(\n    $quantity: Int = 1\n    $variantId: ID!\n    $checkoutId: ID!\n  ) {\n    checkoutLinesAdd(\n      lines: { quantity: $quantity, variantId: $variantId }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation OrderCreateFromCheckout($checkoutId: ID!) {\n    orderCreateFromCheckout(id: $checkoutId, removeCheckout: false) {\n      order {\n        status\n        id\n        total {\n          gross {\n            amount\n            currency\n          }\n          net {\n            amount\n            currency\n          }\n        }\n        user {\n          email\n        }\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation OrderCreateFromCheckout($checkoutId: ID!) {\n    orderCreateFromCheckout(id: $checkoutId, removeCheckout: false) {\n      order {\n        status\n        id\n        total {\n          gross {\n            amount\n            currency\n          }\n          net {\n            amount\n            currency\n          }\n        }\n        user {\n          email\n        }\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation OrderMarkPaid($orderId: ID!) {\n    orderMarkAsPaid(id: $orderId) {\n      order {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation OrderMarkPaid($orderId: ID!) {\n    orderMarkAsPaid(id: $orderId) {\n      order {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignIn($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        field\n        message\n      }\n      user {\n        email\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignIn($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        field\n        message\n      }\n      user {\n        email\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Checkout($checkoutId: ID!) {\n    checkout(id: $checkoutId) {\n      created\n      email\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n      lines {\n        id\n        quantity\n        variant {\n          name\n          pricing {\n            price {\n              gross {\n                amount\n                currency\n              }\n            }\n          }\n          product {\n            media {\n              url(format: ORIGINAL)\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Checkout($checkoutId: ID!) {\n    checkout(id: $checkoutId) {\n      created\n      email\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n      lines {\n        id\n        quantity\n        variant {\n          name\n          pricing {\n            price {\n              gross {\n                amount\n                currency\n              }\n            }\n          }\n          product {\n            media {\n              url(format: ORIGINAL)\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Prodcut($slug: String!) {\n    product(slug: $slug) {\n      name\n      slug\n      seoDescription\n      description\n      media {\n        url(format: ORIGINAL)\n      }\n    }\n  }\n"): (typeof documents)["\n  query Prodcut($slug: String!) {\n    product(slug: $slug) {\n      name\n      slug\n      seoDescription\n      description\n      media {\n        url(format: ORIGINAL)\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Products($first: Int = 10) {\n    products(first: $first, channel: \"default\") {\n      edges {\n        node {\n          id\n          slug\n          name\n          media {\n            url(format: ORIGINAL)\n          }\n          defaultVariant {\n            id\n            pricing {\n              price {\n                gross {\n                  amount\n                  currency\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Products($first: Int = 10) {\n    products(first: $first, channel: \"default\") {\n      edges {\n        node {\n          id\n          slug\n          name\n          media {\n            url(format: ORIGINAL)\n          }\n          defaultVariant {\n            id\n            pricing {\n              price {\n                gross {\n                  amount\n                  currency\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;