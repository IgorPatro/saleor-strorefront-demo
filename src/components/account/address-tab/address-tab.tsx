import React from "react";
import { Input } from "@/components/ui/input";
import { type MeQuery } from "@/saleor/graphql";

interface CustomerTabProps {
  me: MeQuery;
}

export const AddressTab = ({ me }: CustomerTabProps) => {
  return <div>AddressTab</div>;
};
