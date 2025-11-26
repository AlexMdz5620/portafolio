"use server";

import { projectFormSchema } from '@/schemas/projectSchema';
import { SuccessSchema } from '@/schemas/zodSchema';
import { adminProjectService } from '@/service/authService';
import { ActionStateType } from '@/types/actions';
import { getFormDataArray, getFormDataValue } from '@/utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createProject(prevState: ActionStateType, formData: FormData) {
    try {
        const feature = getFormDataValue(formData, 'featured');
        const techsIds = getFormDataArray(formData, 'techIds');

        const project = projectFormSchema.safeParse({
            title: getFormDataValue(formData, 'title'),
            img_url: getFormDataValue(formData, 'img_url'),
            github_url: getFormDataValue(formData, 'github_url'),
            demo_url: getFormDataValue(formData, 'demo_url'),
            type: getFormDataValue(formData, 'type'),
            featured: feature === 'true' ? true : false,
            description: getFormDataValue(formData, 'description'),
            techIds: techsIds
        });


        if (!project.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: project.error.issues.map(issue => issue.message),
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

        const newProject = await adminProjectService.create(project.data, auth);
        const success = SuccessSchema.parse(newProject);
        revalidatePath('/admin/projects');
        revalidatePath('/');

        return {
            success: true,
            msg: success.msg,
            errors: [],
        }
    } catch (error) {
        console.error('Error en createProject:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}

export async function updateProject(id: number, prevState: ActionStateType, formData: FormData) {
    try {
        const feature = getFormDataValue(formData, 'featured');
        const techsIds = getFormDataArray(formData, 'techIds');

        const project = projectFormSchema.safeParse({
            title: getFormDataValue(formData, 'title'),
            img_url: getFormDataValue(formData, 'img_url'),
            github_url: getFormDataValue(formData, 'github_url'),
            demo_url: getFormDataValue(formData, 'demo_url'),
            type: getFormDataValue(formData, 'type'),
            featured: feature === 'true' ? true : false,
            description: getFormDataValue(formData, 'description'),
            techIds: techsIds,
        });

        if (!project.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: project.error.issues.map(issue => issue.message),
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

        const updateProject = await adminProjectService.update(id, project.data, auth);

        console.log('Updating project:', { id, data: project.data });

        const success = SuccessSchema.parse(updateProject);
        revalidatePath('/admin/projects');
        revalidatePath('/');

        return {
            success: true,
            msg: success.msg,
            errors: [],
        };
    } catch (error) {
        console.error('Error en updateProject:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}

export async function deleteProject(id: number, password: string) {
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

        const projectDelete = await adminProjectService.delete(id, password, auth);
        const success = SuccessSchema.parse(projectDelete);

        revalidatePath('/admin/projects');
        revalidatePath('/'); // Si también muestras proyectos en la página principal

        return {
            success: true,
            msg: success.msg,
            errors: [],
        };
    } catch (error) {
        console.error('Error en deleteProject:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: [error instanceof Error ? error.message : 'Error interno del servidor'],
        };
    }
}
