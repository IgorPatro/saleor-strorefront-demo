import React from "react";
import { serverClient } from "@/utils/apolloClient";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { CHECKOUT_EMAIL_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-email-update";
import Image from "next/image";
import axios from "axios";
import { GetServerSideProps } from "next";
import { type CheckoutQuery } from "@/saleor/graphql";
import { CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION } from "@/graphql/mutations/checkout/checkout-billing-address-update";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const checkoutId = ctx.query["checkoutId"] as string;

  return {
    props: { checkoutId },
  };
};

interface CheckoutPageProps {
  checkoutId: string;
}

const CheckoutPage = ({ checkoutId }: CheckoutPageProps) => {
  const { push } = useRouter();

  const {
    data,
    loading: isCheckoutQueryLoading,
    refetch,
  } = useQuery(CHECKOUT_QUERY, {
    variables: {
      checkoutId: checkoutId,
    },
  });
  const [updateEmail, { loading: isUpdateEmailMutationLoading }] = useMutation(
    CHECKOUT_EMAIL_UPDATE_MUTATION
  );
  const [
    updateBillingAddress,
    { loading: isUpdateBillingAddressMutationLoading },
  ] = useMutation(CHECKOUT_BILLING_ADDRESS_UPDATE_MUTATION);

  const [email, setEmail] = React.useState(data?.checkout?.email ?? "");
  const [city, setCity] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");

  React.useEffect(() => {
    setEmail(data?.checkout?.email ?? "");
    setCity(data?.checkout?.billingAddress?.city ?? "");
    setStreet(data?.checkout?.billingAddress?.streetAddress1 ?? "");
    setPostalCode(data?.checkout?.billingAddress?.postalCode ?? "");
  }, [data]);

  const onEmailUpdate = async () => {
    await updateEmail({
      variables: {
        checkoutId,
        email,
      },
    });

    return refetch();
  };

  const onBillingAddressUpdate = async () => {
    await updateBillingAddress({
      variables: {
        checkoutId,
        city,
        streetAddress1: street,
        postalCode,
      },
    });

    return refetch();
  };

  const onCompleteCheckout = async () => {
    try {
      const { data } = await axios.post("/api/generate-order", {
        checkoutId,
        email,
      });

      return push(data.link);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return null;

  const getFirstImage = (arrayOfInages: any[]) => {
    return arrayOfInages[0];
  };

  return (
    <div className="p-4">
      {data.checkout?.lines.map((line) => (
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

      <div className="flex gap-2 items-center">
        <input
          className="border-2 border-black px-2 py-1"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="px-10 py-2 bg-blue-500 text-white font-bold disabled:bg-red-500"
          disabled={isUpdateEmailMutationLoading}
          onClick={onEmailUpdate}
        >
          Save
        </button>
      </div>

      <br />

      <div className="flex gap-2 items-center">
        <input
          className="border-2 border-black px-2 py-1"
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          className="border-2 border-black px-2 py-1"
          type="text"
          placeholder="street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          className="border-2 border-black px-2 py-1"
          type="text"
          placeholder="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <button
          className="px-10 py-2 bg-blue-500 text-white font-bold disabled:bg-red-500"
          disabled={isUpdateBillingAddressMutationLoading}
          onClick={onBillingAddressUpdate}
        >
          Save
        </button>
      </div>

      <br />
      <br />

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
