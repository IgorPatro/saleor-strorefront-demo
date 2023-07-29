import React from "react";
import { serverClient } from "@/utils/apolloClient";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import Image from "next/image";
import axios from "axios";
import { GetServerSideProps } from "next";
import { type CheckoutQuery } from "@/saleor/graphql";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const checkoutId = ctx.query["checkoutId"] as string;

  const { data: checkoutData } = await serverClient.query({
    query: CHECKOUT_QUERY,
    variables: {
      checkoutId: checkoutId,
    },
  });

  return {
    props: { checkoutId, checkoutData },
  };
};

interface CheckoutPageProps {
  checkoutId: string;
  checkoutData?: CheckoutQuery;
}

const CheckoutPage = ({ checkoutId, checkoutData }: CheckoutPageProps) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState(checkoutData?.checkout?.email ?? "");

  const onCompleteCheckout = async () => {
    try {
      const { data } = await axios.post("/api/generate-payment", {
        checkoutId,
        name,
        email,
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!checkoutData) return null;

  const getFirstImage = (arrayOfInages: any[]) => {
    return arrayOfInages[0];
  };

  return (
    <div className="p-4">
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
            {line.quantity} x {line.variant?.pricing?.price?.gross.amount}PLN
          </div>
        </div>
      ))}

      <br />
      <br />
      <br />

      <div className="flex gap-2">
        <input
          className="border-2 border-black px-2 py-1"
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border-2 border-black px-2 py-1"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        className="mt-5 px-10 py-2 bg-blue-500 text-white font-bold"
        onClick={onCompleteCheckout}
      >
        Pay
      </button>
    </div>
  );
};

export default CheckoutPage;
