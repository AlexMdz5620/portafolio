"use server";

import { userFormSchema } from '@/schemas/userSchema';
import { ChangePasswordSchema, ErrorResponseSchema, SuccessSchema } from '@/schemas/zodSchema';
import { adminProfileService } from '@/service/authService';
import { ActionStateType } from '@/types/actions';
import { getFormDataValue } from '@/utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import z from 'zod';

export async function updateProfile(prevState: ActionStateType, formData: FormData) {
    try {
        const profile = userFormSchema.safeParse({
            name: getFormDataValue(formData, 'name'),
            lastname: getFormDataValue(formData, 'lastname'),
            email: getFormDataValue(formData, 'email'),
            photo_url: getFormDataValue(formData, 'photo_url'),
        });

        if (!profile.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: profile.error.issues.map(issue => issue.message),
            }
        }

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token');

        if (!token) {
            return {
                success: false,
                msg: 'No autenticado',
                errors: ['Token no encontrado'],
            };
        }

        const auth = {
            'Authorization': `Bearer ${token.value}`
        };

        const updateProfile = await adminProfileService.updateProfile(profile.data, auth);
        const success = SuccessSchema.parse(updateProfile);
        revalidatePath('/admin/user');
        revalidatePath('/')

        return {
            success: true,
            msg: success.msg,
            errors: [],
        }
    } catch (error) {
        console.error('Error en updateProfile:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}

export async function changePassword(formData: FormData) {
    try {
        const newPassword = {
            current_password: getFormDataValue(formData, 'current_password'),
            new_password: getFormDataValue(formData, 'new_password'),
            confirm_password: getFormDataValue(formData, 'confirm_password'),
        }

        const changePass = ChangePasswordSchema.safeParse(newPassword);

        if (!changePass.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: changePass.error.issues.map(issue => issue.message),
            }
        }

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token');

        if (!token) {
            return {
                success: false,
                msg: 'No autenticado',
                errors: ['Token no encontrado'],
            };
        }

        const auth = {
            'Authorization': `Bearer ${token.value}`
        };

        const data = {
            password: changePass.data.current_password,
            new_password: changePass.data.new_password,
        }

        const updatePassword = await adminProfileService.updatePass(data, auth);
        const success = SuccessSchema.parse(updatePassword);

        return {
            success: true,
            msg: success.msg,
            errors: [],
        }
    } catch (error) {
        console.error('Error en changePassword:', error);

        // ✅ Manejo consistente de errores
        if (error instanceof z.ZodError) {
            return {
                success: false,
                msg: 'Error en la estructura de la respuesta',
                errors: error.issues.map(issue => issue.message),
            };
        }

        if (error instanceof Error) {
            // Intentar parsear el mensaje de error de la API
            try {
                const errorData = JSON.parse(error.message);
                const apiError = ErrorResponseSchema.parse(errorData);

                return {
                    success: false,
                    msg: apiError.message || 'Error del servidor',
                    errors: [apiError.message || 'Error interno del servidor'],
                };
            } catch {
                // Si no se puede parsear, usar el mensaje directo
                return {
                    success: false,
                    msg: error.message,
                    errors: [error.message],
                };
            }
        }

        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}
