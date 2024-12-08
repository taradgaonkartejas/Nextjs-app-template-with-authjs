import { Role } from "@prisma/client";
import { z } from "zod";


// Zod schema to validate user data for creation
export const userCreateSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")  // Ensures the email is valid
    .min(5, "Email must be at least 5 characters long")
    .max(255, "Email must be less than 255 characters long"),
    
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")  // Password length check
    .max(255, "Password must be less than 255 characters long"),  // Max length for password
    
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be less than 100 characters long"),
    
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be less than 100 characters long"),
    
  role: z.enum([Role.ADMIN, Role.USER])  // Use enum values in array form
    .default(Role.USER),  // Default role is USER if not specified

}).refine((data) => data.password.length >= 8, {
  message: "Password must be at least 8 characters long",
  path: ["password"], // Path to show the error
});

export const signInSchema = z.object({
  email: z
  .string()
  .email("Invalid email address"),  // Ensures the email is valid
  
password: z
  .string()
  .min(8, "Password must be at least 8 characters long")  // Password length check
  .max(20, "Password must be less than 20 characters long"),  // Max length for password
})

export type SignInSchema = z.infer<typeof signInSchema>
