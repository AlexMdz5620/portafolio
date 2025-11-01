import z from 'zod';

export const descriptioinSchema = z.object({
    id: z.number(),
    type: z.enum(['main', 'about']),
    name: z.string(),
    content: z.string(),
});

export type Description = z.infer<typeof descriptioinSchema>;
export type Descriptions = Description[];
export type DescriptionForm = Pick<Description, 'name' | 'type' | 'content'>
