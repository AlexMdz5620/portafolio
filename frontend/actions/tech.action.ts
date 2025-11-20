"use server";

import { techFormSchema } from '@/schemas/techSchema';
import { SuccessSchema } from '@/schemas/zodSchema';
import { adminTechService } from '@/service/authService';
import { ActionStateType } from '@/types/actions';
import { getFormDataValue } from '@/utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createTech(prevState: ActionStateType, formData: FormData) {
    try {
        const tech = techFormSchema.safeParse({
            name: getFormDataValue(formData, 'name'),
            mastery_level: getFormDataValue(formData, 'mastery_level'),
            category: getFormDataValue(formData, 'category'),
        });

        if (!tech.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: tech.error.issues.map(issue => issue.message),
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
            'Authorization': `Bearer ${token?.value}`
        };

        const newTech = await adminTechService.create(tech.data, auth);
        const success = SuccessSchema.parse(newTech);
        revalidatePath('/admin/techs');
        revalidatePath('/');

        return {
            success: true,
            msg: success.msg,
            errors: [],
        }
    } catch (error) {
        console.error('Error en createTech:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}

export async function updateTech(id: number, prevState: ActionStateType, formData: FormData) {
    try {
        const tech = techFormSchema.safeParse({
            name: getFormDataValue(formData, 'name'),
            mastery_level: getFormDataValue(formData, 'mastery_level'),
            category: getFormDataValue(formData, 'category'),
        });

        if (!tech.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: tech.error.issues.map(issue => issue.message),
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
            'Authorization': `Bearer ${token?.value}`
        };

        const updateTech = await adminTechService.update(id, tech.data, auth);
        const success = SuccessSchema.parse(updateTech);
        revalidatePath('/admin/techs');
        revalidatePath('/');

        return {
            success: true,
            msg: success.msg,
            errors: [],
        }
    } catch (error) {
        console.error('Error en updateTech:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}

export async function deleteTech(id: number) {
    try {
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
            'Authorization': `Bearer ${token?.value}`
        };

        const courseDelete = await adminTechService.delete(+id, auth);
        const success = SuccessSchema.parse(courseDelete);
        revalidatePath('/admin/courses');
        revalidatePath('/');

        return {
            success: true,
            msg: success.msg,
            errors: [],
        }
    } catch (error) {
        console.error('Error en deleteTech', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error del servidor'],
        }
    }
}
