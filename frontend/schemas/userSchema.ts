import z from 'zod';

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
});

export type UserFormData = z.infer<typeof userFormSchema>;
export type User = z.infer<typeof userSchema>;
