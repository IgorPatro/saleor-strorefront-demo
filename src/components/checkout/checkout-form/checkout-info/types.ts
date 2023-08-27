import * as z from "zod";

export const CheckoutInfoFormSchema = z
  .object({
    email: z.string().email(),
    shippingPhone: z.string().min(5),
    shippingFirstName: z.string().min(1),
    shippingLastName: z.string().min(1),
    shippingAddressCity: z.string().min(3),
    shippingAddressStreet: z.string().min(3),
    shippingPostalCode: z.string().min(3),

    note: z.string().optional(),
    requireInvoice: z.boolean(),

    billingCompany: z.string().optional(),
    billingNip: z.string().optional(),
    billingAddressCity: z.string().optional(),
    billingAddressStreet: z.string().optional(),
    billingPostalCode: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.requireInvoice) {
        return (
          data.billingCompany &&
          data.billingNip &&
          data.billingAddressCity &&
          data.billingAddressStreet &&
          data.billingPostalCode
        );
      }
      return true;
    },
    {
      message: "All billing fields are required when requireInvoice is true",
      path: ["billing"],
    }
  );

export type CheckoutInfoFormValues = z.infer<typeof CheckoutInfoFormSchema>;
