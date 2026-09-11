import { z } from 'zod';

// create a zod schema for login including email and password
// validate that email contains an "@" symbol and that the password is at least 6 characters long
export const loginSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z
        .string({ message: 'Password must be a string' })
        .min(1, 'Password is required'),
});

// create a zod schema for register including name, email and password
// validate that name is at least 2 characters long, email contains an "@" symbol and that the password is at least 6 characters long
export const registerSchema = z.object({
    username: z
        .string({ message: 'Username must be a string' })
        .min(2, { message: 'Username must be at least 2 characters long' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z
        .string({ message: 'Password must be a string' })
        .min(6, { message: 'Password must be at least 6 characters long' }),
});

// create a zod schema for adding a series to the watchlist including seriesId
// validate that seriesId is a string and is not empty
export const addToWatchlistSchema = z.object({
    seriesId: z
        .string({ message: 'seriesId must be a string' })
        .min(1, 'seriesId is required'),
});
