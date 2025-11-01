'use server';

import { ErrorResponseSchema, LoginSchema } from '@/schemas/zodSchema';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

type ActionStateType = {
    errors: string[];
}

export async function login(
    prevState: ActionStateType | undefined,
    formData: FormData
) {
    const loginCredentials = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const auth = LoginSchema.safeParse(loginCredentials);

    if (!auth.success) {
        return {
            errors: auth.error.issues.map(issue => issue.message)
        }
    }

    const url = `${process.env.API_URL}/auth/login`;

    try {
        const req = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: auth.data.email,
                password: auth.data.password,
            }),
        });

        const json = await req.json();

        if (!req.ok) {
            const parsed = ErrorResponseSchema.safeParse(json);

            if (!parsed.success) {
                return { errors: ['Error desconocido en el servidor'] };
            }

            return { errors: [parsed.data.message] };
        }

        const cookiesStore = await cookies();
        cookiesStore.set('access_token', json.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
    } catch (error) {
        console.log(error);
        return { errors: ['Error de conexión con el servidor'] };
    }

    redirect('/admin');
}