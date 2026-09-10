import { z } from 'zod';
// create a zod schema for the episode model which includes episodeNumber, title and duration
// add suitable error messages for each field
export const createEpisodeSchema = z.object({
    episodeNumber: z
        .number()
        .int()
        .positive()
        .describe('Episode number must be a positive integer'),
    title: z
        .string()
        .max(200)
        .describe(
            'Title must be a string with a maximum length of 200 characters',
        ),
    duration: z
        .number()
        .positive()
        .describe('Duration must be a positive number'),
});

// create a zod schema for updating a episode model which includes title and/or duration
// one of the fields must be present and have suitable error messages for each field
export const updateEpisodeSchema = z
    .object({
        title: z
            .string()
            .max(200)
            .optional()
            .describe(
                'Title must be a string with a maximum length of 200 characters',
            ),
        duration: z
            .number()
            .positive()
            .optional()
            .describe('Duration must be a positive number'),
    })
    .refine((data) => data.title || data.duration, {
        message: 'Either title or duration must be provided',
    });
