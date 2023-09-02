import { serverClient } from "@/utils/apollo-client";
import { PRODUCTS_QUERY } from "@/graphql/queries/products";
import { ProductCard } from "@/components/product/product-card";
import { useAddToCart } from "@/hooks/use-add-to-cart";
import { type Product } from "@/saleor/graphql";
import { Hero } from "@/components/hero";
import { ProductsList } from "@/components/products-list";
import { RiH1 } from "react-icons/ri";

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
  const { handleAddToCart } = useAddToCart();

  return (
    <>
      <Hero />
      <ProductsList
        label={<h1 className="uppercase text-4xl">Personalne</h1>}
        products={products}
      />
      <div className="flex gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </>
  );
}
