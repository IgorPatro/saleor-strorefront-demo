import * as z from "zod";

export const CheckoutFormCustomerSchema = z.object({
  billingEmail: z.string().email(),
  billingPhone: z.string().min(5),
  billingFirstName: z.string().min(1),
  billingLastName: z.string().min(1),
  billingAddressCity: z.string().min(1),
  billingAddressStreet: z.string().min(1),
  billingPostalCode: z.string().min(1),

  shippingPhone: z.string().min(5),
  shippingFirstName: z.string().min(1),
  shippingLastName: z.string().min(1),
  shippingAddressCity: z.string().min(1),
  shippingAddressStreet: z.string().min(1),
  shippingPostalCode: z.string().min(1),
});

export type CheckoutFormCustomerInterface = z.infer<
  typeof CheckoutFormCustomerSchema
>;

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
