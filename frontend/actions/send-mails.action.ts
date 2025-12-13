'use server';

import { contactFormSchema, type ContactForm } from '@/schemas/zodSchema';
import { Resend } from 'resend';
import { isRateLimited } from './rate-limit.action';
import { render } from '@react-email/render';
import { ContactTemplate } from '@/components/emails/contact-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: ContactForm, ip: string = 'default') {
    if (isRateLimited(`email-${ip}`, 5)) {
        return {
            success: false,
            message: 'Demasiados intentos. Por favor, espera un minuto.'
        }
    }

    const validationEmail = contactFormSchema.safeParse(data);

    if (!validationEmail.success) {
        const formattedErrors: Record<string, string> = {};

        Object.entries(validationEmail.error.flatten().fieldErrors).forEach(
            ([key, value]) => {
                if (value && value.length > 0) {
                    formattedErrors[key] = value[0];
                }
            }
        );

        return {
            success: false,
            errors: formattedErrors, // Ahora es Record<string, string>
            message: 'Error de validación'
        };

    }

    const { name, email, subject, message } = validationEmail.data;

    try {
        const emailHtml = await render(
            ContactTemplate({ name, email, subject, message })
        );

        const { data: resendData, error } = await resend.emails.send({
            from: `Portfolio Contact <${process.env.RESEND_FROM_EMAIL}>`,
            to: [process.env.RESEND_TO_EMAIL!],
            subject: `[Portfolio] ${subject}`,
            html: emailHtml,
            tags: [
                { name: 'category', value: 'portfolio_contact' },
                { name: 'source', value: 'website_form' }
            ],
        });

        if (error) {
            console.error('Error de Resend:', error);
            return {
                success: false,
                message: 'Error al enviar el email: ' + error.message
            };
        }

        return {
            success: true,
            data: resendData,
            message: '¡Mensaje enviado con éxito!'
        };

    } catch (error) {
        console.error('Error inesperado:', error);
        return {
            success: false,
            message: 'Error inesperado. Por favor, intenta nuevamente.',
            // success: false,
            // msg: 'Error del servidor',
            // errors: ['Error del servidor'],
        };

    }

}