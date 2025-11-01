import z from 'zod';

export const courseSchema = z.object({
    id: z.number(),
    title: z.string(),
    institute: z.string(),
    img_url: z.string(),
    description: z.string(),
    complete_date: z.date(),
    created_at: z.date(),
});

export type Course = z.infer<typeof courseSchema>;
export type Courses = Course[];
export type CourseForm = Pick<Course, 'title' | 'institute' | 'img_url' | 'description' | 'complete_date'>
