import z from 'zod';

// Schema para FormData
export const descriptionFromSchema = z.object({
    type: z.enum(['main', 'about'], 'El tipo es requerido.'),
    name: z.string().optional(),
    content: z.string()
        .min(1, 'El contenido es requerido.')
        .max(500, 'El contenido no puede tener más de 500 caracteres'),
})

// Schema para la entidad completa
export const descriptionSchema = z.object({
    id: z.number(),
    type: z.enum(['main', 'about']),
    name: z.string(),
    content: z.string(),
});

export type DescriptionFormData = z.infer<typeof descriptionFromSchema>;
export type Description = z.infer<typeof descriptionSchema>;
export type Descriptions = Description[];