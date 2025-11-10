import { z } from 'zod';

// Schema más flexible para FormData
export const courseFormSchema = z.object({
    title: z.string().min(1, "El título es requerido."),
    institute: z.string().min(1, "La institución es requerida."),
    img_url: z.string().optional().default(''),
    description: z.string().optional().default(''),
    complete_date: z.string().min(1, "La fecha de finalización es requerida."),
});

// Schema para la entidad completa
export const courseSchema = z.object({
    id: z.string(),
    title: z.string(),
    institute: z.string(),
    img_url: z.string().optional(),
    description: z.string().optional(),
    complete_date: z.string(),
    created_at: z.string().optional(),
});

// Tipos inferidos
export type CourseFormData = z.infer<typeof courseFormSchema>;
export type Course = z.infer<typeof courseSchema>;
export type Courses = Course[];
export type CourseWithId = Course & { id: string };