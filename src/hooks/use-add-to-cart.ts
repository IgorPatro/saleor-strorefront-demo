import { useMutation, useQuery, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { CHECKOUT_CREATE_MUTATION } from "@/graphql/mutations/checkout/checkout-create";
import { CHECKOUT_LINES_ADD_MUTATION } from "@/graphql/mutations/checkout/checkout-lines-add";
import { useLocalStorage } from "@/utils/use-local-storage";
import { ME_QUERY } from "@/graphql/queries/me";

export const useAddToCart = () => {
  const [localStorageCartId, setLocalStorageCartId] =
    useLocalStorage<string>("cartId");
  const [createCheckout] = useMutation(CHECKOUT_CREATE_MUTATION);
  const [addLinesToCheckout] = useMutation(CHECKOUT_LINES_ADD_MUTATION);
  const { data: me } = useQuery(ME_QUERY);
  const { push } = useRouter();
  const { data: session } = useSession();
  const client = useApolloClient();

  const handleAddToCart = async (variantId: string) => {
    if (me?.me?.checkout?.id) {
      await addLinesToCheckout({
        variables: {
          variantId,
          checkoutId: me.me.checkout.id,
        },
      });

      await client.clearStore();

      return push(`/cart/${me?.me?.checkout?.id}`);
    }

    if (localStorageCartId) {
      await addLinesToCheckout({
        variables: {
          variantId,
          checkoutId: localStorageCartId,
        },
      });

      await client.clearStore();

      return push(`/cart/${localStorageCartId}`);
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

    return push(`/cart/${data?.checkoutCreate?.checkout?.id}`);
  };

  return { handleAddToCart };
};
