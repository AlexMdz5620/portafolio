"use server";

import { linkFormSchema } from '@/schemas/linkSchema';
import { adminLinkService } from '@/service/authService';
import { ActionStateType } from '@/types/actions';
import { getFormDataValue } from '@/utils';
import { cookies } from 'next/headers';
import { SuccessSchema } from '../schemas/zodSchema';
import { revalidatePath } from 'next/cache';

export async function createLink(prevState: ActionStateType, formData: FormData) {
    try {
        const activeValue = getFormDataValue(formData, 'active');
        const link = linkFormSchema.safeParse({
            name: getFormDataValue(formData, 'name'),
            link: getFormDataValue(formData, 'link'),
            active: activeValue === 'true' ? true : false,
        });

        if (!link.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: link.error.issues.map(issue => issue.message),
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

        const newLink = await adminLinkService.create(link.data, auth);
        const success = SuccessSchema.parse(newLink);
        revalidatePath('/admin/links');

        return {
            success: true,
            msg: success.msg,
            errors: [],
        }
    } catch (error) {
        console.error('Error en createLink:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}

export async function updateLink(id: number, prevState: ActionStateType, formData: FormData) {
    try {
        const activeValue = getFormDataValue(formData, 'active');
        const link = linkFormSchema.safeParse({
            name: getFormDataValue(formData, 'name'),
            link: getFormDataValue(formData, 'link'),
            active: activeValue === 'true' ? true : false,
        });

        if (!link.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: link.error.issues.map(issue => issue.message),
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

        const updateLink = await adminLinkService.update(id, link.data, auth);
        const success = SuccessSchema.parse(updateLink);
        revalidatePath('/admin/links');

        return {
            success: true,
            msg: success.msg,
            errors: []
        }
    } catch (error) {
        console.error('Error en updateLink:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}

export async function deleteLink(id: number, password: string) {
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

        const deleteLink = await adminLinkService.delete(id, password, auth);
        const success = SuccessSchema.parse(deleteLink);
        revalidatePath('/admin/links');

        return {
            success: true,
            msg: success.msg,
            errors: [],
        }
    } catch (error) {
        console.error('Error en deleteLink:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}
