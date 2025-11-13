import z from 'zod';

export const techFormSchema = z.object({
    name: z.string().min(1, 'El nombre de la tecnología es requerido.'),
    mastery_level: z.string().optional(),
    category: z.string().min(1, 'La categoría de la tecnología es requerida.'),
})

export const techSchema = z.object({
    id: z.number(),
    name: z.string(),
    mastery_level: z.string(),
    category: z.string(),
    created_at: z.date(),
});

export type TechFormData = z.infer<typeof techFormSchema>;
export type Tech = z.infer<typeof techSchema>;
export type Techs = Tech[];
