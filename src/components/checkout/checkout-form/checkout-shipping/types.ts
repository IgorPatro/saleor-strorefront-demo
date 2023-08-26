import * as z from "zod";

export const CheckoutShippingFormSchema = z.object({
  parcelLockerName: z.string().optional().nullable(),
  parcelLockerCity: z.string().optional().nullable(),
  parcelLockerStreet: z.string().optional().nullable(),
  parcelLockerPostalCode: z.string().optional().nullable(),

  shippingMethodId: z.string().min(1, "Please select shipping method"),
});

export type CheckoutShippingFormValues = z.infer<
  typeof CheckoutShippingFormSchema
>;
