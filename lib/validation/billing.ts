import { z } from "zod";

export const billingProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "The 'Name' field is required." })
    .max(100),
  surname: z
    .string()
    .min(1, { message: "The 'Surname' field is required." })
    .max(120),
  country: z
    .string()
    .min(1, { message: "The 'Country' field is required." })
    .max(120),
  city: z
    .string()
    .min(1, { message: "The 'City' field is required." })
    .max(120),
  addressLine1: z
    .string()
    .min(1, { message: "The 'Address line 1' field is required." })
    .max(200),
  addressLine2: z.string().min(2).max(200).optional().or(z.literal("")),
  postalCode: z
    .string()
    .min(1, { message: "The 'Postal code' field is required." })
    .max(20),
  receiptEmail: z.string().email().optional().or(z.literal("")),
});
