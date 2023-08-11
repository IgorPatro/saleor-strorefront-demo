import React from "react";
import { useRouter } from "next/router";
import { PRODUCTS_SEARCH_QUERY } from "@/graphql/queries/products-search";
import { useQuery } from "@apollo/client";
import { ProductCard } from "@/components/product/product-card";

import { type Product } from "@/saleor/graphql";

const SearchPage = () => {
  const { query } = useRouter();
  const searchQuery = query["q"] as string;

  const { data, loading: isLoading } = useQuery(PRODUCTS_SEARCH_QUERY, {
    variables: {
      search: searchQuery,
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data || data?.products?.edges?.length === 0)
    return <div>No products found</div>;

  return (
    <div>
      <h1>Search results:</h1>
      {data?.products?.edges?.map(({ node }) => (
        <ProductCard key={node.id} product={node as Product} />
      ))}
    </div>
  );
};

export default SearchPage;
