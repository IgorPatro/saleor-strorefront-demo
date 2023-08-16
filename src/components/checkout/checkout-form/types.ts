import * as z from "zod";

export const CheckoutFormSchema = z.object({
  email: z.string().email(),
  shippingPhone: z.string().min(5),
  shippingFirstName: z.string().min(1),
  shippingLastName: z.string().min(1),
  shippingAddressCity: z.string().min(3),
  shippingAddressStreet: z.string().min(3),
  shippingPostalCode: z.string().min(3),

  note: z.string().optional(),
  requireInvoice: z.boolean(), // This info will be added to order note

  billingCompany: z.string().optional(), // Company name + NIP
  billingAddressCity: z.string().optional(),
  billingAddressStreet: z.string().optional(),
  billingPostalCode: z.string().optional(),

  parcelLockerName: z.string().optional().nullable(),
  parcelLockerCity: z.string().optional().nullable(),
  parcelLockerStreet: z.string().optional().nullable(),
  parcelLockerPostalCode: z.string().optional().nullable(),

  shippingMethodId: z.string().min(1, "Please select shipping method"),
});

export type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>;
