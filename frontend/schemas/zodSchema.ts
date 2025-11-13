import { z } from 'zod';

/* Login */
export const LoginSchema = z.object({
    email: z.email({ message: 'Email no válido' })
        .min(1, { message: 'El Email es Obligatorio' }),
    password: z.string()
        .min(1, { message: 'El Password no puede ir vacio' })
});

/* Errors & Success */
export const SuccessSchema = z.object({
    msg: z.string(),
});

export const ErrorResponseSchema = z.object({
    message: z.string(),
    error: z.string().optional(),
    statusCode: z.number().optional(),
});

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

/* Change Password Form */
export const changePassForm = z.object({
    password: z.string(),
    new_password: z.string(),
});

export type ChangePassForm = z.infer<typeof changePassForm>
