"use server";

import { ActionStateType } from '@/types/actions';
import { descriptionFromSchema } from '../schemas/descriptionSchema';
import { getFormDataValue } from '@/utils';
import { cookies } from 'next/headers';
import { adminDescriptionService } from '@/service/authService';
import { SuccessSchema } from '@/schemas/zodSchema';
import { revalidatePath } from 'next/cache';

export async function createDescription(prevState: ActionStateType, formData: FormData) {
    try {
        const description = descriptionFromSchema.safeParse({
            name: getFormDataValue(formData, 'name'),
            type: getFormDataValue(formData, 'type'),
            content: getFormDataValue(formData, 'content'),
        });

        if (!description.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: description.error.issues.map(issue => issue.message)
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

        const newDescription = await adminDescriptionService.create(description.data, auth);
        const success = SuccessSchema.parse(newDescription);
        revalidatePath('/admin/descriptions');

        return {
            success: true,
            msg: success.msg,
            errors: [],
        }
    } catch (error) {
        console.error('Error en createDescription', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        }
    }
}

export async function updateDescription(id: number, prevState: ActionStateType, formData: FormData) {
    try {
        const description = descriptionFromSchema.safeParse({
            name: getFormDataValue(formData, 'name'),
            type: getFormDataValue(formData, 'type'),
            content: getFormDataValue(formData, 'content'),
        });

        if (!description.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: description.error.issues.map(issue => issue.message)
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

        const updateDescription = await adminDescriptionService.update(id, description.data, auth);

        const success = SuccessSchema.parse(updateDescription);
        revalidatePath('/admin/descriptions');

        return {
            success: true,
            msg: success.msg,
            errors: []
        }
    } catch (error) {
        console.error('Error en udpdateDescription', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        }
    }
}

export async function deleteDescription(id: number, password: string) {
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

        const deleteDescription = await adminDescriptionService.delete(id, password, auth);
        const success = SuccessSchema.parse(deleteDescription);
        revalidatePath('/admin/description');

        return {
            success: true,
            msg: success.msg,
            errors: [''],
        }
    } catch (error) {
        console.error('Error en deleteDescription', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        }
    }
}