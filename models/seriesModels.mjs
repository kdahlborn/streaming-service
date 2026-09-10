// create a zod schema for the series model which includes title, genre and releaseYear
// add suitable error messages for each field
import { z } from 'zod';

export const createSeriesSchema = z.object({
    title: z
        .string()
        .min(2)
        .max(100)
        .describe('Season title must be between 2 and 100 characters'),
    genre: z
        .string()
        .min(2)
        .max(100)
        .describe('Season genre must be between 2 and 100 characters'),
    releaseYear: z
        .number()
        .min(1888)
        .max(new Date().getFullYear() + 1)
        .describe('Season release year must be a valid year'),
});
