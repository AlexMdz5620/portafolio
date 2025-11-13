import z from 'zod';

export const projectFormSchema = z.object({
    title: z.string().min(1, 'El nombre del proyecto es requerido.'),
    img_url: z.string().optional(),
    github_url: z.string().min(1, 'El link del repositorio del proyecto es requerido.'),
    demo_url: z.string().min(1, 'El link del proyecto es requerido.'),
    type: z.string().optional(),
    featured: z.boolean().default(false),
    description: z.string().optional(),
    created_at: z.date().min(1, 'La fecha de finalización del proyecto es requerida.'),
    techId: z.number().array(),
});

export const projectSchema = z.object({
    id: z.number(),
    title: z.string(),
    img_url: z.string().optional(),
    github_url: z.string(),
    demo_url: z.string(),
    type: z.string(),
    featured: z.boolean(),
    description: z.string(),
    created_at: z.date(),
    techId: z.number().array(),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Projects = Project[];
export type ProjectCategory = Project['type'];
