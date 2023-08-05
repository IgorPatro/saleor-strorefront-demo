import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import { serverClient, client } from "@/utils/apollo-client";
import { PRODUCTS_QUERY } from "@/graphql/queries/products";
import { CHECKOUT_CREATE_MUTATION } from "@/graphql/mutations/checkout/checkout-create";
import { CHECKOUT_LINES_ADD_MUTATION } from "@/graphql/mutations/checkout/checkout-lines-add";
import { useLocalStorage } from "@/utils/use-local-storage";
import { ME_QUERY } from "@/graphql/queries/me";

import { ProductCard } from "@/components/product/product-card";

import { type Product } from "@/saleor/graphql";

export const getServerSideProps = async () => {
  const { data } = await serverClient.query({
    query: PRODUCTS_QUERY,
  });

  const products = data
    ? data.products?.edges.map(({ node }) => ({ ...node }))
    : [];

  return {
    props: {
      products,
    },
  };
};

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [cartId, setCartId] = useLocalStorage<string>("cartId");
  const [createCheckout] = useMutation(CHECKOUT_CREATE_MUTATION);
  const [addLinesToCheckout] = useMutation(CHECKOUT_LINES_ADD_MUTATION);
  const { data: me } = useQuery(ME_QUERY);
  const { push } = useRouter();

  const onAddToCart = async (variantId: string) => {
    let currentCartId = me?.me?.checkout?.id ?? cartId;

    if (currentCartId) {
      const { data } = await addLinesToCheckout({
        variables: {
          variantId,
          checkoutId: currentCartId,
        },
      });

      if (
        data &&
        data?.checkoutLinesAdd &&
        data?.checkoutLinesAdd?.errors?.length > 0
      ) {
        setCartId(undefined);

        const { data } = await createCheckout({
          variables: {
            variantId,
          },
        });

        if (
          data &&
          data.checkoutCreate &&
          data.checkoutCreate.errors.length > 0
        ) {
          // TODO: Handle error message
          return;
        }

        setCartId(data?.checkoutCreate?.checkout?.id);
        return push(`/cart/${data?.checkoutCreate?.checkout?.id}`);
      }

      client.clearStore();

      return push(`/cart/${currentCartId}`);
    }

    const { data } = await createCheckout({
      variables: {
        variantId,
      },
    });

    if (data && data.checkoutCreate && data.checkoutCreate.errors.length > 0) {
      // TODO: Handle error message
      return;
    }

    setCartId(data?.checkoutCreate?.checkout?.id);
    return push(`/cart/${data?.checkoutCreate?.checkout?.id}`);
  };

  return (
    <div className="flex gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
