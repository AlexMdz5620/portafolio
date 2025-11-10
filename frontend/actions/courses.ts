"use server";

import { courseFormSchema } from '@/schemas/courseSchema';
import { SuccessSchema } from '@/schemas/zodSchema';
import { adminCourseService } from '@/service/authService';
import { formatDateForBackend, getFormDataValue } from '@/utils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

type ActionStateType = {
    success: boolean;
    msg: string;
    errors: string[];
    shouldReload: boolean;
}

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
                shouldReload: false,
            }
        }

        const cookieStore = await cookies();
        const token = cookieStore.get('access_token');

        if (!token) {
            return {
                success: false,
                msg: 'No autenticado',
                errors: ['Token no encontrado'],
                shouldReload: false,
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
            shouldReload: true,
        }
    } catch (error) {
        console.error('Error en createCourse:', error);
        return {
            success: false,
            msg: 'Error del servidor',
            errors: ['Error interno del servidor'],
            shouldReload: false,
        };
    }
}

export async function updateCourse(id: string, prevState: ActionStateType, formData: FormData) {
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
            shouldReload: false,
        }
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('access_token');

    if (!token) {
        return {
            success: false,
            msg: 'No autenticado',
            errors: ['Token no encontrado'],
            shouldReload: false,
        };
    }

    const auth = {
        'Authorization': `Bearer ${token?.value}`
    };

    const editCourse = await adminCourseService.update(id, course.data, auth);

    const success = SuccessSchema.parse(editCourse);
    revalidatePath('/admin/courses');
    revalidatePath('/');

    return {
        success: true,
        msg: success.msg,
        errors: [],
        shouldReload: true,
    }
}

export async function deleteCourse(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token');

    if (!token) {
        return {
            success: false,
            msg: 'No autenticado',
            errors: ['Token no encontrado'],
            shouldReload: false,
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
        shouldReload: false,
    }
}

// export async function uploadImage(formData: FormData): Promise<string> {
//     const cookieStore = await cookies();
//     const token = cookieStore.get('access_token');

//     if (!token) {
//         return 'No autenticado';
//     }

//     const auth = {
//         'Authorization': `Bearer ${token?.value}`
//     };

//     const updateImage = await adminCourseService.uploadImgCourse(formData, auth)

//     return updateImage.secure_url
// }
