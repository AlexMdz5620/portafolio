import z from 'zod';

export const linkFormSchema = z.object({
    name: z.string().min(1, 'El nombre de es requerido.'),
    link: z.string().min(1, 'El enlace es requerido.'),
    active: z.boolean(),
})

export const linkSchema = z.object({
    id: z.number(),
    name: z.string(),
    link: z.string(),
    active: z.boolean(),
});

export type LinkFormData = z.infer<typeof linkFormSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Links = Link[];
