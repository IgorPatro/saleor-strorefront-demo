import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Address } from "@/saleor/graphql";

import { AddressFormSchema, type AddressFormInterface } from "./types";

export const useAddressForm = (address?: Address) => {
  return useForm({
    defaultValues: {
      firstName: address?.firstName ?? "",
      lastName: address?.lastName ?? "",
      phone: address?.phone ?? "",
      streetAddress1: address?.streetAddress1 ?? "",
      city: address?.city ?? "",
      postalCode: address?.postalCode ?? "",
    },
    resolver: zodResolver(AddressFormSchema),
  });
};
