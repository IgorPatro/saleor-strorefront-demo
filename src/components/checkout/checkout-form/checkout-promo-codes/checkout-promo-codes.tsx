import React from "react";
import { CheckoutQuery } from "@/saleor/graphql";
import { CHECKOUT_ADD_PROMO_CODE_MUTATION } from "@/graphql/mutations/checkout/checkout-add-promo-code";
import { useMutation, useApolloClient } from "@apollo/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CHECKOUT_QUERY } from "@/graphql/queries/checkout";
import { CHECKOUT_REMOVE_PROMO_CODE_MUTATION } from "@/graphql/mutations/checkout/checkout-remove-promo-code";
import { set } from "react-hook-form";

interface CheckoutPromoCodesProps {
  checkoutId: string;
  checkoutData: CheckoutQuery;
}

export const CheckoutPromoCodes = ({
  checkoutId,
  checkoutData,
}: CheckoutPromoCodesProps) => {
  const [promoCode, setPromoCode] = React.useState<string>("");
  const [addPromoCode] = useMutation(CHECKOUT_ADD_PROMO_CODE_MUTATION);
  const [removePromoCode] = useMutation(CHECKOUT_REMOVE_PROMO_CODE_MUTATION);
  const client = useApolloClient();

  const handleAddPromoCode = async () => {
    const { data } = await addPromoCode({
      variables: {
        checkoutId,
        promoCode: promoCode,
      },
    });

    await client.refetchQueries({
      include: [CHECKOUT_QUERY],
    });
  };

  const handleRemovePromoCode = async () => {
    if (!checkoutData?.checkout?.voucherCode) return;

    const { data } = await removePromoCode({
      variables: {
        checkoutId,
        promoCode: checkoutData.checkout.voucherCode,
      },
    });

    await client.refetchQueries({
      include: [CHECKOUT_QUERY],
    });

    return setPromoCode("");
  };

  const promoCodeName = checkoutData?.checkout?.voucherCode;

  return (
    <div>
      {promoCodeName ? (
        <div className="flex justify-between items-center">
          <div>
            {checkoutData?.checkout?.voucherCode} applied (-
            {checkoutData?.checkout?.discount?.amount}PLN)
          </div>
          <Button variant="destructive" onClick={handleRemovePromoCode}>
            Remove
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Button
            className="w-52"
            disabled={!promoCode}
            onClick={handleAddPromoCode}
          >
            Add promo code
          </Button>
        </div>
      )}
    </div>
  );
};
