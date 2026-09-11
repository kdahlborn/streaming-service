import { z } from 'zod';

// create a zod schema for login including email and password
// validate that email contains an "@" symbol and that the password is at least 6 characters long
export const loginSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
});

// create a zod schema for register including name, email and password
// validate that name is at least 2 characters long, email contains an "@" symbol and that the password is at least 6 characters long
export const registerSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
});
