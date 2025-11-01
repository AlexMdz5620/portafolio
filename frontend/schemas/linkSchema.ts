import z from 'zod';

export const linkSchema = z.object({
    id: z.number(),
    name: z.string(),
    link: z.email(),
    active: z.boolean(),
});

export type Link = z.infer<typeof linkSchema>;
export type Links = Link[];
export type LinkForm = Pick<Link, 'name' | 'link' | 'active'>
