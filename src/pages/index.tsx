import { useQuery } from "@apollo/client"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

import { serverClient } from "@/utils/apolloClient"
import { PRODUCTS_QUERY } from "@/graphql/queries/products"
import { ME_QUERY } from "@/graphql/queries/me"

import ProductCard from "@/components/ProductCard/ProductCard"

export const getServerSideProps = async () => {
  const { data } = await serverClient.query({
    query: PRODUCTS_QUERY,
  })

  return {
    props: {
      products: data?.products.edges,
    },
  }
}

export default function Home({ products }: any) {
  // const { data } = useQuery(PRODUCTS_QUERY);
  const { data: me } = useQuery(ME_QUERY)
  const session = useSession()

  console.log(session)
  console.log(me)

  return (
    <div className="p-8">
      <h1 className="underline text-red-500">Hello world!</h1>
      <button
        className="bg-blue-400 px-6 py-2 rounded-lg"
        onClick={() => signOut()}
      >
        Sign out
      </button>
      <br />
      <br />
      <div className="flex gap-4">
        {products.map((product: any) => (
          <Link
            href={`/product/${product.node.slug}`}
            key={product.node.id}
            className=""
          >
            <ProductCard
              productName={product.node.name}
              imageSrc={product.node.media[0].url}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
