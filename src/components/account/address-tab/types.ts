import * as z from "zod";

export const AddressFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  streetAddress1: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
});

export type AddressFormInterface = z.infer<typeof AddressFormSchema>;
