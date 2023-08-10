import * as z from "zod";

export const CheckoutFormShippingSchema = z.object({
  parcelLockerName: z.string().optional().nullable(),
  parcelLockerCity: z.string().optional().nullable(),
  parcelLockerStreet: z.string().optional().nullable(),
  parcelLockerPostalCode: z.string().optional().nullable(),

  shippingMethodId: z.string(),
});

export type CheckoutFormShippingInterface = z.infer<
  typeof CheckoutFormShippingSchema
>;
