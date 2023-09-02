import { useMutation, useQuery, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React from "react";

import { CHECKOUT_CREATE_MUTATION } from "@/graphql/mutations/checkout/checkout-create";
import { CHECKOUT_LINES_ADD_MUTATION } from "@/graphql/mutations/checkout/checkout-lines-add";
import { CHECKOUT_LINES_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-lines-update";
import { CHECKOUT_LINES_DELETE_MUTATION } from "@/graphql/mutations/checkout/checkout-lines-delete";
import { useLocalStorage } from "@/utils/use-local-storage";
import { ME_QUERY } from "@/graphql/queries/me";

export const useCart = () => {
  const [localStorageCartId, setLocalStorageCartId] =
    useLocalStorage<string>("cartId");
  const [createCheckout, { loading: isCreateCheckoutMutationLoading }] =
    useMutation(CHECKOUT_CREATE_MUTATION);
  const [addLinesToCheckout, { loading: isAddMutationLoading }] = useMutation(
    CHECKOUT_LINES_ADD_MUTATION
  );
  const [updateLines, { loading: isUpdateMutationLoading }] = useMutation(
    CHECKOUT_LINES_UPDATE_MUTATION
  );
  const [deleteLine, { loading: isDeleteMutationLoading }] = useMutation(
    CHECKOUT_LINES_DELETE_MUTATION
  );
  const { data: me } = useQuery(ME_QUERY);
  const { push } = useRouter();
  const { data: session } = useSession();
  const client = useApolloClient();

  const cartId = React.useMemo(() => {
    if (me?.me?.checkout?.id) {
      return me.me.checkout.id;
    }

    if (localStorageCartId) {
      return localStorageCartId;
    }

    return null;
  }, [localStorageCartId, me?.me?.checkout?.id]);

  const handleAddToCart = async (variantId: string) => {
    if (cartId) {
      await addLinesToCheckout({
        variables: {
          variantId,
          checkoutId: cartId,
        },
      });

      await client.clearStore();

      return push(`/cart`);
    }

    const { data } = await createCheckout({
      variables: {
        variantId,
      },
    });

    // Add to local storage only if user is not signed in
    if (!session) {
      setLocalStorageCartId(data?.checkoutCreate?.checkout?.id);
    }

    await client.clearStore();

    return push(`/cart`);
  };

  const handleUpdateProductQuantity = async (
    quantity: number,
    lineId: string
  ) => {
    if (quantity === 0) return;

    if (!cartId) return;

    await updateLines({
      variables: {
        checkoutId: cartId,
        lineId,
        quantity,
      },
    });

    await client.clearStore();
  };

  const handleDeleteProduct = async (lineId: string) => {
    if (!cartId) return;

    await deleteLine({
      variables: {
        checkoutId: cartId,
        lineId,
      },
    });

    await client.clearStore();
  };

  const isLoading =
    isUpdateMutationLoading ||
    isDeleteMutationLoading ||
    isAddMutationLoading ||
    isCreateCheckoutMutationLoading;

  return {
    cartId,
    isLoading,
    handleAddToCart,
    handleUpdateProductQuantity,
    handleDeleteProduct,
  };
};
