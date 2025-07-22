import * as z from "zod";

export const createUserAuthSchema = (t: any) => {
  return z
    .object({
      name: z.string().min(1, t("nameRequired")),
      email: z.string().email(t("emailInvalid")),
      password: z.string().min(6, t("passwordMinLength")),
      confirmPassword: z.string().min(6, t("confirmPasswordMinLength")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordsNotMatch"),
      path: ["confirmPassword"],
    });
};

export const userAuthSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
