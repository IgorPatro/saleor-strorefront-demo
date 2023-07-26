import React from "react"
import { serverClient } from "@/utils/apolloClient"
import { PRODUCT_QUERY } from "@/graphql/queries/product"
import Image from "next/image"
import ReactMarkdown from "react-markdown"

export const getServerSideProps = async (ctx: any) => {
  const productSlug = ctx.query["productSlug"] as string

  const { data } = await serverClient.query({
    query: PRODUCT_QUERY,
    variables: {
      slug: productSlug,
    },
  })

  return {
    props: { productSlug, data },
  }
}

function renderBlock(block: any) {
  switch (block.type) {
    case "paragraph":
      return <ReactMarkdown>{block.data.text}</ReactMarkdown>
    case "header":
      // react-markdown allows you to map markdown types to custom react components.
      // Here we map headers of level 1 to h1 elements, level 2 to h2, and so on.
      // We pass the markdown content as children to the ReactMarkdown component.
      return (
        <ReactMarkdown
          components={{ h1: ({ node: any, ...props }) => <h1 {...props} /> }}
        >
          {block.data.text}
        </ReactMarkdown>
      )
    default:
      return null
  }
}

// const JsonContent =
//   '{"time": 1689878231963, "blocks": [{"id": "M-pekNZPDG", "data": {"text": "Test"}, "type": "paragraph"}, {"id": "-XBulvFQax", "data": {"text": "This is heading", "level": 1}, "type": "header"}, {"id": "GVWWp8_WUh", "data": {"text": "![cat](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkIQgckWx3NgeysRYvIodWkUbEKG0bGESMkXzN6tfc&amp;s)"}, "type": "paragraph"}], "version": "2.24.3"}'

// const blocks = JSON.parse(JsonContent).blocks.map((block: any) => block)

const ProductPage = ({ productSlug, data }: any) => {
  console.log(data)
  const blocks = JSON.parse(data.product.description).blocks.map(
    (block: any) => block
  )

  console.log(blocks)

  console.log(data)
  return (
    <div className="bg-slate-100 w-full h-screen mr-auto flex justify-center pt-16">
      <div className="bg-slate-700 h-5/6 w-4/6 p-12 rounded-3xl flex justify-between">
        <div className=" w-1/2">
          <h1 className="text-white text-4xl">
            {data.product.name + " " + data.product.variants[0].sku}
          </h1>
          <p className="text-white my-4">
            Nasi klienci ocenili ten kurs na: {data.product.rating}
          </p>
          <Image
            src={data.product.media[0].url}
            alt="not yet"
            width={300}
            height={500}
          />
        </div>
        <div className="w-1/2">
          <h1 className="text-white text-4xl">
            {data.product.name + " " + data.product.variants[0].sku}
          </h1>
          <h2 className="text-white my-4 text-3xl">
            Cena: {data.product.pricing?.priceRange?.start?.gross?.amount} zł
          </h2>
        </div>

        {/* {productSlug} */}
        {blocks.map((block: any) => renderBlock(block))}
        <ReactMarkdown>### Siusiak</ReactMarkdown>
      </div>
    </div>
  )
}

export default ProductPage
