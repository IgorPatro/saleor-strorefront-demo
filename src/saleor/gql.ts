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
    "\n  mutation AccountAddressCreate($city: String, $firstName: String, $lastName: String, $phone: String, $postalCode: String, $streetAddress1: String) {\n    accountAddressCreate(\n      input: {\n        firstName: $firstName,\n        lastName: $lastName,\n        phone: $phone,\n        postalCode: $postalCode,\n        streetAddress1: $streetAddress1\n        city: $city,\n        country: PL\n      }\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.AccountAddressCreateDocument,
    "\n  mutation AccountAddressDelete($addressId: ID!) {\n    accountAddressDelete(\n      id: $addressId\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.AccountAddressDeleteDocument,
    "\n  mutation AccountAddressUpdate($addressId: ID!, $city: String, $firstName: String, $lastName: String, $phone: String, $postalCode: String, $streetAddress1: String) {\n    accountAddressUpdate(\n      id: $addressId,\n      input: {\n        firstName: $firstName,\n        lastName: $lastName,\n        phone: $phone,\n        postalCode: $postalCode,\n        streetAddress1: $streetAddress1\n        city: $city,\n        country: PL\n      }\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.AccountAddressUpdateDocument,
    "\n  mutation AccountSetDefaultAddress($addressId: ID!, $type: AddressTypeEnum!) {\n    accountSetDefaultAddress(\n      id: $addressId,\n      type: $type\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.AccountSetDefaultAddressDocument,
    "\n  mutation AccountUpdate($firstName: String, $lastName: String) {\n    accountUpdate(\n      input: { firstName: $firstName, lastName: $lastName }\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.AccountUpdateDocument,
    "\n  mutation CheckoutBillingAddressUpdate(\n    $checkoutId: ID!\n    $firstName: String!\n    $lastName: String!\n    $phone: String!\n    $city: String!\n    $streetAddress1: String!\n    $postalCode: String!\n  ) {\n    checkoutBillingAddressUpdate(\n      billingAddress: {\n        country: PL\n        firstName: $firstName\n        lastName: $lastName\n        phone: $phone\n        city: $city\n        streetAddress1: $streetAddress1\n        postalCode: $postalCode\n      }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n": types.CheckoutBillingAddressUpdateDocument,
    "\n  mutation CheckoutCreate($quantity: Int = 1, $variantId: ID!) {\n    checkoutCreate(\n      input: { lines: { quantity: $quantity, variantId: $variantId } }\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.CheckoutCreateDocument,
    "\n  mutation CheckoutEmailUpdate($checkoutId: ID!, $email: String!) {\n    checkoutEmailUpdate(email: $email, checkoutId: $checkoutId) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.CheckoutEmailUpdateDocument,
    "\n  mutation CheckoutLinesAdd(\n    $quantity: Int = 1\n    $variantId: ID!\n    $checkoutId: ID!\n  ) {\n    checkoutLinesAdd(\n      lines: { quantity: $quantity, variantId: $variantId }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.CheckoutLinesAddDocument,
    "\n  mutation CheckoutLinesDelete($lineId: ID!, $checkoutId: ID!) {\n    checkoutLinesDelete(\n      linesIds: [$lineId]\n      id: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.CheckoutLinesDeleteDocument,
    "\n  mutation CheckoutLinesUpdate($lineId: ID!, $quantity: Int = 1, $checkoutId: ID!) {\n    checkoutLinesUpdate(\n      lines: { lineId: $lineId, quantity: $quantity }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n        code\n      }\n    }\n  }\n": types.CheckoutLinesUpdateDocument,
    "\n  mutation CheckoutShippingAddressUpdate(\n    $checkoutId: ID!\n    $firstName: String\n    $lastName: String\n    $phone: String\n    $city: String!\n    $streetAddress1: String!\n    $postalCode: String!\n    $streetAddress2: String\n  ) {\n    checkoutShippingAddressUpdate(\n      shippingAddress: {\n        country: PL\n        firstName: $firstName\n        lastName: $lastName\n        phone: $phone\n        city: $city\n        streetAddress1: $streetAddress1\n        streetAddress2: $streetAddress2\n        postalCode: $postalCode\n      }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n": types.CheckoutShippingAddressUpdateDocument,
    "\n  mutation CheckoutShippingMethodUpdate(\n    $shippingMethodId: ID!\n    $checkoutId: ID!\n  ) {\n    checkoutShippingMethodUpdate(\n      shippingMethodId: $shippingMethodId\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n": types.CheckoutShippingMethodUpdateDocument,
    "\n  mutation OrderCreateFromCheckout($checkoutId: ID!) {\n    orderCreateFromCheckout(id: $checkoutId) {\n      order {\n        status\n        id\n        total {\n          gross {\n            amount\n            currency\n          }\n          net {\n            amount\n            currency\n          }\n        }\n        user {\n          email\n        }\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n": types.OrderCreateFromCheckoutDocument,
    "\n  mutation OrderMarkPaid($orderId: ID!) {\n    orderMarkAsPaid(id: $orderId) {\n      order {\n        id\n      }\n    }\n  }\n": types.OrderMarkPaidDocument,
    "\n  mutation SignIn($email: String!, $password: String!) {\n    tokenCreate(email: $email, password: $password) {\n      token\n      refreshToken\n      errors {\n        field\n        message\n      }\n      user {\n        email\n        firstName\n        lastName\n      }\n    }\n  }\n": types.SignInDocument,
    "\n  query Checkout($checkoutId: ID!) {\n    checkout(id: $checkoutId) {\n      created\n      email\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n      billingAddress {\n        phone\n        firstName\n        lastName\n        city\n        streetAddress1\n        postalCode\n      }\n      shippingAddress {\n        phone\n        firstName\n        lastName\n        city\n        streetAddress1\n        postalCode\n      }\n      lines {\n        id\n        quantity\n        variant {\n          name\n          pricing {\n            price {\n              gross {\n                amount\n                currency\n              }\n            }\n          }\n          product {\n            name\n            media {\n              url(format: ORIGINAL)\n            }\n          }\n        }\n      }\n      isShippingRequired\n      shippingMethods {\n        name\n        id\n        metafields\n        price {\n          amount\n        }\n      }\n    }\n  }\n": types.CheckoutDocument,
    "\n  query Me {\n    me {\n      id\n      email\n      firstName\n      lastName\n      checkout {\n        id\n      }\n      addresses {\n        id\n        city\n        postalCode\n        streetAddress1\n        firstName\n        lastName\n        phone\n        isDefaultBillingAddress\n        isDefaultShippingAddress\n      }\n      orders(first: 10) {\n        edges {\n          node {\n            id\n            status\n            created\n            total {\n              gross {\n                amount\n              }\n            }\n            paymentStatus\n            lines {\n              id\n              quantity\n              variant {\n                pricing {\n                  price {\n                    gross {\n                      amount\n                      currency\n                    }\n                  }\n                }\n                product {\n                  media {\n                    id\n                    url(format: ORIGINAL)\n                  }\n                  name\n                }\n                name\n              }\n            }\n            isPaid\n          }\n        }\n      }\n      defaultBillingAddress {\n        city\n        firstName\n        lastName\n        phone\n        streetAddress1\n        postalCode\n      }\n      defaultShippingAddress {\n        city\n        firstName\n        lastName\n        phone\n        streetAddress1\n        postalCode\n      }\n    }\n  }\n": types.MeDocument,
    "\n  query Order($orderId: ID!) {\n    order(id: $orderId) {\n      created\n      lines {\n        id\n        quantity\n        variant {\n          name\n          pricing {\n            price {\n              gross {\n                amount\n                currency\n              }\n            }\n          }\n          product {\n            media {\n              url(format: ORIGINAL)\n            }\n          }\n        }\n      }\n    }\n  }\n": types.OrderDocument,
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
export function gql(source: "\n  mutation AccountAddressCreate($city: String, $firstName: String, $lastName: String, $phone: String, $postalCode: String, $streetAddress1: String) {\n    accountAddressCreate(\n      input: {\n        firstName: $firstName,\n        lastName: $lastName,\n        phone: $phone,\n        postalCode: $postalCode,\n        streetAddress1: $streetAddress1\n        city: $city,\n        country: PL\n      }\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AccountAddressCreate($city: String, $firstName: String, $lastName: String, $phone: String, $postalCode: String, $streetAddress1: String) {\n    accountAddressCreate(\n      input: {\n        firstName: $firstName,\n        lastName: $lastName,\n        phone: $phone,\n        postalCode: $postalCode,\n        streetAddress1: $streetAddress1\n        city: $city,\n        country: PL\n      }\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AccountAddressDelete($addressId: ID!) {\n    accountAddressDelete(\n      id: $addressId\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AccountAddressDelete($addressId: ID!) {\n    accountAddressDelete(\n      id: $addressId\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AccountAddressUpdate($addressId: ID!, $city: String, $firstName: String, $lastName: String, $phone: String, $postalCode: String, $streetAddress1: String) {\n    accountAddressUpdate(\n      id: $addressId,\n      input: {\n        firstName: $firstName,\n        lastName: $lastName,\n        phone: $phone,\n        postalCode: $postalCode,\n        streetAddress1: $streetAddress1\n        city: $city,\n        country: PL\n      }\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AccountAddressUpdate($addressId: ID!, $city: String, $firstName: String, $lastName: String, $phone: String, $postalCode: String, $streetAddress1: String) {\n    accountAddressUpdate(\n      id: $addressId,\n      input: {\n        firstName: $firstName,\n        lastName: $lastName,\n        phone: $phone,\n        postalCode: $postalCode,\n        streetAddress1: $streetAddress1\n        city: $city,\n        country: PL\n      }\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AccountSetDefaultAddress($addressId: ID!, $type: AddressTypeEnum!) {\n    accountSetDefaultAddress(\n      id: $addressId,\n      type: $type\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AccountSetDefaultAddress($addressId: ID!, $type: AddressTypeEnum!) {\n    accountSetDefaultAddress(\n      id: $addressId,\n      type: $type\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AccountUpdate($firstName: String, $lastName: String) {\n    accountUpdate(\n      input: { firstName: $firstName, lastName: $lastName }\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AccountUpdate($firstName: String, $lastName: String) {\n    accountUpdate(\n      input: { firstName: $firstName, lastName: $lastName }\n    ) {\n      user {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CheckoutBillingAddressUpdate(\n    $checkoutId: ID!\n    $firstName: String!\n    $lastName: String!\n    $phone: String!\n    $city: String!\n    $streetAddress1: String!\n    $postalCode: String!\n  ) {\n    checkoutBillingAddressUpdate(\n      billingAddress: {\n        country: PL\n        firstName: $firstName\n        lastName: $lastName\n        phone: $phone\n        city: $city\n        streetAddress1: $streetAddress1\n        postalCode: $postalCode\n      }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CheckoutBillingAddressUpdate(\n    $checkoutId: ID!\n    $firstName: String!\n    $lastName: String!\n    $phone: String!\n    $city: String!\n    $streetAddress1: String!\n    $postalCode: String!\n  ) {\n    checkoutBillingAddressUpdate(\n      billingAddress: {\n        country: PL\n        firstName: $firstName\n        lastName: $lastName\n        phone: $phone\n        city: $city\n        streetAddress1: $streetAddress1\n        postalCode: $postalCode\n      }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n"];
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
export function gql(source: "\n  mutation CheckoutLinesDelete($lineId: ID!, $checkoutId: ID!) {\n    checkoutLinesDelete(\n      linesIds: [$lineId]\n      id: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CheckoutLinesDelete($lineId: ID!, $checkoutId: ID!) {\n    checkoutLinesDelete(\n      linesIds: [$lineId]\n      id: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CheckoutLinesUpdate($lineId: ID!, $quantity: Int = 1, $checkoutId: ID!) {\n    checkoutLinesUpdate(\n      lines: { lineId: $lineId, quantity: $quantity }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n        code\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CheckoutLinesUpdate($lineId: ID!, $quantity: Int = 1, $checkoutId: ID!) {\n    checkoutLinesUpdate(\n      lines: { lineId: $lineId, quantity: $quantity }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        field\n        message\n        code\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CheckoutShippingAddressUpdate(\n    $checkoutId: ID!\n    $firstName: String\n    $lastName: String\n    $phone: String\n    $city: String!\n    $streetAddress1: String!\n    $postalCode: String!\n    $streetAddress2: String\n  ) {\n    checkoutShippingAddressUpdate(\n      shippingAddress: {\n        country: PL\n        firstName: $firstName\n        lastName: $lastName\n        phone: $phone\n        city: $city\n        streetAddress1: $streetAddress1\n        streetAddress2: $streetAddress2\n        postalCode: $postalCode\n      }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CheckoutShippingAddressUpdate(\n    $checkoutId: ID!\n    $firstName: String\n    $lastName: String\n    $phone: String\n    $city: String!\n    $streetAddress1: String!\n    $postalCode: String!\n    $streetAddress2: String\n  ) {\n    checkoutShippingAddressUpdate(\n      shippingAddress: {\n        country: PL\n        firstName: $firstName\n        lastName: $lastName\n        phone: $phone\n        city: $city\n        streetAddress1: $streetAddress1\n        streetAddress2: $streetAddress2\n        postalCode: $postalCode\n      }\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CheckoutShippingMethodUpdate(\n    $shippingMethodId: ID!\n    $checkoutId: ID!\n  ) {\n    checkoutShippingMethodUpdate(\n      shippingMethodId: $shippingMethodId\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CheckoutShippingMethodUpdate(\n    $shippingMethodId: ID!\n    $checkoutId: ID!\n  ) {\n    checkoutShippingMethodUpdate(\n      shippingMethodId: $shippingMethodId\n      checkoutId: $checkoutId\n    ) {\n      checkout {\n        id\n      }\n      errors {\n        message\n        field\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation OrderCreateFromCheckout($checkoutId: ID!) {\n    orderCreateFromCheckout(id: $checkoutId) {\n      order {\n        status\n        id\n        total {\n          gross {\n            amount\n            currency\n          }\n          net {\n            amount\n            currency\n          }\n        }\n        user {\n          email\n        }\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation OrderCreateFromCheckout($checkoutId: ID!) {\n    orderCreateFromCheckout(id: $checkoutId) {\n      order {\n        status\n        id\n        total {\n          gross {\n            amount\n            currency\n          }\n          net {\n            amount\n            currency\n          }\n        }\n        user {\n          email\n        }\n      }\n      errors {\n        field\n        message\n      }\n    }\n  }\n"];
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
export function gql(source: "\n  query Checkout($checkoutId: ID!) {\n    checkout(id: $checkoutId) {\n      created\n      email\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n      billingAddress {\n        phone\n        firstName\n        lastName\n        city\n        streetAddress1\n        postalCode\n      }\n      shippingAddress {\n        phone\n        firstName\n        lastName\n        city\n        streetAddress1\n        postalCode\n      }\n      lines {\n        id\n        quantity\n        variant {\n          name\n          pricing {\n            price {\n              gross {\n                amount\n                currency\n              }\n            }\n          }\n          product {\n            name\n            media {\n              url(format: ORIGINAL)\n            }\n          }\n        }\n      }\n      isShippingRequired\n      shippingMethods {\n        name\n        id\n        metafields\n        price {\n          amount\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Checkout($checkoutId: ID!) {\n    checkout(id: $checkoutId) {\n      created\n      email\n      totalPrice {\n        gross {\n          amount\n          currency\n        }\n      }\n      billingAddress {\n        phone\n        firstName\n        lastName\n        city\n        streetAddress1\n        postalCode\n      }\n      shippingAddress {\n        phone\n        firstName\n        lastName\n        city\n        streetAddress1\n        postalCode\n      }\n      lines {\n        id\n        quantity\n        variant {\n          name\n          pricing {\n            price {\n              gross {\n                amount\n                currency\n              }\n            }\n          }\n          product {\n            name\n            media {\n              url(format: ORIGINAL)\n            }\n          }\n        }\n      }\n      isShippingRequired\n      shippingMethods {\n        name\n        id\n        metafields\n        price {\n          amount\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Me {\n    me {\n      id\n      email\n      firstName\n      lastName\n      checkout {\n        id\n      }\n      addresses {\n        id\n        city\n        postalCode\n        streetAddress1\n        firstName\n        lastName\n        phone\n        isDefaultBillingAddress\n        isDefaultShippingAddress\n      }\n      orders(first: 10) {\n        edges {\n          node {\n            id\n            status\n            created\n            total {\n              gross {\n                amount\n              }\n            }\n            paymentStatus\n            lines {\n              id\n              quantity\n              variant {\n                pricing {\n                  price {\n                    gross {\n                      amount\n                      currency\n                    }\n                  }\n                }\n                product {\n                  media {\n                    id\n                    url(format: ORIGINAL)\n                  }\n                  name\n                }\n                name\n              }\n            }\n            isPaid\n          }\n        }\n      }\n      defaultBillingAddress {\n        city\n        firstName\n        lastName\n        phone\n        streetAddress1\n        postalCode\n      }\n      defaultShippingAddress {\n        city\n        firstName\n        lastName\n        phone\n        streetAddress1\n        postalCode\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      id\n      email\n      firstName\n      lastName\n      checkout {\n        id\n      }\n      addresses {\n        id\n        city\n        postalCode\n        streetAddress1\n        firstName\n        lastName\n        phone\n        isDefaultBillingAddress\n        isDefaultShippingAddress\n      }\n      orders(first: 10) {\n        edges {\n          node {\n            id\n            status\n            created\n            total {\n              gross {\n                amount\n              }\n            }\n            paymentStatus\n            lines {\n              id\n              quantity\n              variant {\n                pricing {\n                  price {\n                    gross {\n                      amount\n                      currency\n                    }\n                  }\n                }\n                product {\n                  media {\n                    id\n                    url(format: ORIGINAL)\n                  }\n                  name\n                }\n                name\n              }\n            }\n            isPaid\n          }\n        }\n      }\n      defaultBillingAddress {\n        city\n        firstName\n        lastName\n        phone\n        streetAddress1\n        postalCode\n      }\n      defaultShippingAddress {\n        city\n        firstName\n        lastName\n        phone\n        streetAddress1\n        postalCode\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Order($orderId: ID!) {\n    order(id: $orderId) {\n      created\n      lines {\n        id\n        quantity\n        variant {\n          name\n          pricing {\n            price {\n              gross {\n                amount\n                currency\n              }\n            }\n          }\n          product {\n            media {\n              url(format: ORIGINAL)\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Order($orderId: ID!) {\n    order(id: $orderId) {\n      created\n      lines {\n        id\n        quantity\n        variant {\n          name\n          pricing {\n            price {\n              gross {\n                amount\n                currency\n              }\n            }\n          }\n          product {\n            media {\n              url(format: ORIGINAL)\n            }\n          }\n        }\n      }\n    }\n  }\n"];
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