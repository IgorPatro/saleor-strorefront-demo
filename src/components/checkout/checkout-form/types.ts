import * as z from "zod";

export const CheckoutFormSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(5),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  billingAddressCity: z.string().min(1),
  billingAddressStreet: z.string().min(1),
  billingPostalCode: z.string().min(1),
  shippingAddressCity: z.string().optional(),
  shippingAddressStreet: z.string().optional(),
  shippingPostalCode: z.string().optional(),
  shippingMethodId: z.string(),
});

export type CheckoutFormInterface = z.infer<typeof CheckoutFormSchema>;
