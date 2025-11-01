import z from 'zod';

export const projectSchema = z.object({
    id: z.number(),
    title: z.string(),
    img_url: z.string(),
    github_url: z.optional(z.string()),
    demo_url: z.optional(z.string()),
    type: z.string(),
    featured: z.boolean(),
    description: z.string(),
    created_at: z.date(),
    techId: z.array(z.number()),
});

export type Project = z.infer<typeof projectSchema>;
export type Projects = Project[];
export type ProjectCategory = Project['type'];
export type ProjectForm = Pick<Project, 'title' | 'img_url' | 'github_url' | 'demo_url' | 'type' | 'featured' | 'description'>
