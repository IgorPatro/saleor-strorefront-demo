import * as z from "zod";

export const CheckoutFormShippingSchema = z.object({
  parcelLockerName: z.string().optional().nullable(),
  parcelLockerCity: z.string().optional().nullable(),
  parcelLockerStreet: z.string().optional().nullable(),
  parcelLockerPostalCode: z.string().optional().nullable(),

  shippingMethodId: z.string().min(1),
});

export type CheckoutFormShippingInterface = z.infer<
  typeof CheckoutFormShippingSchema
>;
