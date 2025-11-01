import z from 'zod';

export const techSchema = z.object({
    id: z.number(),
    name: z.string(),
    mastery_level: z.string(),
    category: z.string(),
    created_at: z.date(),
});

export type Tech = z.infer<typeof techSchema>;
export type Techs = Tech[];
export type TechForm = Pick<Tech, 'name' | 'mastery_level' | 'category'>;
