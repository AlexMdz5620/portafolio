import { z } from 'zod';

/* Link */
export const linkSchema = z.object({
    id: z.number(),
    name: z.string(),
    link: z.email(),
    active: z.boolean(),
});

export type Link = z.infer<typeof linkSchema>;

/* User */
export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    lastname: z.string(),
    email: z.string(),
    photo_url: z.string(),
    description_1: z.optional(z.string()),
    description_2: z.optional(z.string()),
    links: z.array(linkSchema),
});

export type User = z.infer<typeof userSchema>;

/* Projects */
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
});

export type Project = z.infer<typeof projectSchema>;

/* Tech */
export const techSchema = z.object({
    id: z.number(),
    name: z.string(),
    mastery_level: z.string(),
    category: z.string(),
    created_at: z.date(),
});

export type Tech = z.infer<typeof techSchema>;

/* Course */
export const courseSchema = z.object({
    id: z.number(),
    title: z.string(),
    institute: z.string(),
    img_url: z.string(),
    description: z.string(),
    complete_date: z.date(),
    created_at: z.date(),
    user: z.optional(userSchema),
});

export type Course = z.infer<typeof courseSchema>;

/* Contact Form */
export const contacFormSchema = z.object({
    name: z.string()
        .nonempty({ message: 'El nombre no puede ir vacío.' }),
    email: z.email({ message: 'El correo electrónico no tiene un formato válido.' })
        .nonempty({ message: 'El correo electrónico no puede ir vacío.' }),
    subject: z.string()
        .nonempty({ message: 'El asunto no puede ir vacío.' }),
    message: z.string()
        .nonempty({ message: 'El mensaje no puede ir vacío.' }),
});

export type ContacForm = z.infer<typeof contacFormSchema>;
