import React from "react";
import { serverClient } from "@/utils/apolloClient";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import Image from "next/image";
import axios from "axios";
import { GetServerSideProps } from "next";
import { type CheckoutQuery } from "@/saleor/graphql";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cartId = ctx.query["cartId"] as string;

  const { data: checkoutData } = await serverClient.query({
    query: CHECKOUT_QUERY,
    variables: {
      checkoutId: cartId,
    },
  });

  return {
    props: { cartId, checkoutData },
  };
};

interface CheckoutPageProps {
  cartId: string;
  checkoutData?: CheckoutQuery;
}

const CheckoutPage = ({ cartId, checkoutData }: CheckoutPageProps) => {
  const onCompleteCheckout = async () => {
    const response = axios.post("/api/generate-payment", {
      checkoutId: cartId,
    });

    console.log(response);
  };

  if (!checkoutData) return null;

  const getFirstImage = (arrayOfInages: any[]) => {
    return arrayOfInages[0];
  };

  return (
    <div>
      {cartId}
      {checkoutData.checkout?.lines.map((line) => (
        <div key={line.id} className="p-2 flex items-center gap-8">
          <div>
            {line.variant.name}
            <br />
            <Image
              src={getFirstImage(line.variant.product.media ?? []).url}
              alt="not yet"
              width={300}
              height={500}
            />
          </div>
          <div>
            {line.quantity} x {line.variant.pricing?.price?.gross.amount}PLN
          </div>
        </div>
      ))}
      <button
        className="px-10 py-2 bg-blue-500 text-white font-bold"
        onClick={() => "Move to payment"}
      >
        Move to payment
      </button>
    </div>
  );
};

export default CheckoutPage;
