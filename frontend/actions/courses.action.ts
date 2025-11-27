"use server";

import { courseFormSchema } from '@/schemas/courseSchema';
import { SuccessSchema } from '@/schemas/zodSchema';
import { adminCourseService } from '@/service/authService';
import { ActionStateType } from '@/types/actions';
import { formatDateForBackend, getFormDataValue } from '@/utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function createCourse(prevState: ActionStateType, formData: FormData) {
    try {
        const completeDateValue = getFormDataValue(formData, 'complete_date');

        const course = courseFormSchema.safeParse({
            title: getFormDataValue(formData, 'title'),
            institute: getFormDataValue(formData, 'institute'),
            img_url: getFormDataValue(formData, 'img_url'),
            description: getFormDataValue(formData, 'description'),
            complete_date: formatDateForBackend(completeDateValue),
        });

        if (!course.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: course.error.issues.map(issue => issue.message),
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

        const newCourse = await adminCourseService.create(course.data, auth);
        const success = SuccessSchema.parse(newCourse);
        revalidatePath('/admin/courses');
        revalidatePath('/');

        return {
            success: true,
            msg: success.msg,
            errors: [],
        }
    } catch (error) {
        console.error('Error en createCourse:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}

export async function updateCourse(id: number, prevState: ActionStateType, formData: FormData) {
    try {
        const completeDateValue = getFormDataValue(formData, 'complete_date');
        const course = courseFormSchema.safeParse({
            title: getFormDataValue(formData, 'title'),
            institute: getFormDataValue(formData, 'institute'),
            img_url: getFormDataValue(formData, 'img_url'),
            description: getFormDataValue(formData, 'description'),
            complete_date: formatDateForBackend(completeDateValue),
        });

        if (!course.success) {
            return {
                success: false,
                msg: 'Error de validación',
                errors: course.error.issues.map(issue => issue.message),
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

        const editCourse = await adminCourseService.update(+id, course.data, auth);

        const success = SuccessSchema.parse(editCourse);
        revalidatePath('/admin/courses');
        revalidatePath('/');

        return {
            success: true,
            msg: success.msg,
            errors: [],
        }
    } catch (error) {
        console.error('Error en updateCourse:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}

export async function deleteCourse(id: number) {
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

        const courseDelete = await adminCourseService.delete(id, auth);
        const success = SuccessSchema.parse(courseDelete);
        revalidatePath('/admin/courses');
        revalidatePath('/');

        return {
            success: true,
            msg: success.msg,
            errors: [''],
        }
    } catch (error) {
        console.error('Error en deleteCourse:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
        };
    }
}
