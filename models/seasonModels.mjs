// create a zod schema for the season model which only includes the seasonNumber
// add a suitable error message for the seasonNumber validation
import { z } from 'zod';

export const createSeasonSchema = z.object({
    seasonNumber: z
        .number()
        .min(1)
        .describe('Season number must be a positive integer'),
});
