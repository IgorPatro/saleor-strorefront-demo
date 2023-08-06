import React from "react";
import { Input } from "@/components/ui/input";
import { type Address, type MeQuery } from "@/saleor/graphql";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { AddressCard } from "./address-card";

interface CustomerTabProps {
  me: MeQuery;
}

export const AddressTab = ({ me }: CustomerTabProps) => {
  const addresses = me?.me?.addresses ?? [];

  return (
    <div className="flex flex-col gap-4">
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address as Address} />
      ))}
    </div>
  );
};
