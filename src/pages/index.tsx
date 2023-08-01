import { useMutation, useQuery } from "@apollo/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { serverClient, client } from "@/utils/apolloClient";
import { PRODUCTS_QUERY } from "@/graphql/queries/products";
import { CHECKOUT_CREATE_MUTATION } from "@/graphql/mutations/checkout/checkout-create";
import { CHECKOUT_LINES_ADD_MUTATION } from "@/graphql/mutations/checkout/checkout-lines-add";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { ME_QUERY } from "@/graphql/queries/me";

import { type Product } from "@/saleor/graphql";

export const getServerSideProps = async () => {
  const { data } = await serverClient.query({
    query: PRODUCTS_QUERY,
  });

  const products = data ? data.products?.edges : [];

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

  const onRedirectToCart = () => {
    const currentCartId = me?.me?.checkout?.id ?? cartId;

    if (currentCartId) {
      return push(`/cart/${currentCartId}`);
    }
  };

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
    <div className="p-8">
      <h1 className="underline text-red-500">
        Hello {me?.me?.firstName} {me?.me?.lastName} ({me?.me?.email})
      </h1>
      <button
        className="bg-blue-400 px-6 py-2 rounded-lg"
        onClick={() => signOut()}
      >
        Sign out
      </button>
      <br />
      <button
        className="bg-blue-400 px-6 py-2 rounded-lg"
        onClick={onRedirectToCart}
      >
        Koszyk
      </button>
      <div className="flex gap-4">
        {products.map((product: any) => (
          <Link
            href={`/product/${product.node.slug}`}
            key={product.node.id}
            className="w-64 bg-slate-100 p-4"
          >
            <h2>{product.node.name}</h2>
            <Image
              src={product.node.media[0].url}
              alt="not yet"
              width={300}
              height={500}
            />
            {product.node.defaultVariant.pricing.price.gross.amount}PLN
            <br />
            <button
              className="px-4 py-2 rounded-md bg-blue-200"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product.node.defaultVariant.id);
              }}
            >
              Cart
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
