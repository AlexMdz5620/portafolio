import z from 'zod';
import { techSchema } from './techSchema';

export const projectFormSchema = z.object({
    title: z.string().min(1, 'El nombre del proyecto es requerido.'),
    img_url: z.string().optional(),
    github_url: z.string().min(1, 'El link del repositorio del proyecto es requerido.'),
    demo_url: z.string().min(1, 'El link del proyecto es requerido.'),
    type: z.string().optional(),
    featured: z.boolean().default(false),
    description: z.string().optional(),
    techIds: z.array(z.number()),
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
    techs: z.array(techSchema),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Projects = Project[];
export type ProjectCategory = Project['type'];
