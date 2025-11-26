import z from 'zod';
import { linkSchema } from './linkSchema';
import { descriptionSchema } from './descriptionSchema';

export const userFormSchema = z.object({
    name: z.string(),
    lastname: z.string(),
    email: z.string(),
    photo_url: z.string(),
});

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    lastname: z.string(),
    email: z.string(),
    photo_url: z.string(),
    links: z.optional(z.array(linkSchema)),
    descriptions: z.optional(z.array(descriptionSchema))
});

export type UserFormData = z.infer<typeof userFormSchema>;
export type User = z.infer<typeof userSchema>;
