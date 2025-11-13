import z from 'zod';
import { linkSchema } from './linkSchema';
import { descriptionSchema } from './descriptionSchema';
import { courseSchema } from './courseSchema';
import { projectSchema } from './projectSchema';
import { techSchema } from './techSchema';

export const userFormSchema = z.object({
    name: z.string(),
    lastname: z.string(),
    email: z.string(),
    photo_url: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    courses: z.optional(z.array(courseSchema)),
    projects: z.optional(z.array(projectSchema)),
    techs: z.optional(z.array(techSchema)),
    links: z.optional(z.array(linkSchema)),
    descriptions: z.optional(z.array(descriptionSchema)),
});

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    lastname: z.string(),
    email: z.string(),
    photo_url: z.string(),
    created_at: z.date(),
    updated_at: z.date(),
    courses: z.optional(z.array(courseSchema)),
    projects: z.optional(z.array(projectSchema)),
    techs: z.optional(z.array(techSchema)),
    links: z.optional(z.array(linkSchema)),
    descriptions: z.optional(z.array(descriptionSchema)),
});

export type UserFormData = z.infer<typeof userFormSchema>;
export type User = z.infer<typeof userSchema>;
