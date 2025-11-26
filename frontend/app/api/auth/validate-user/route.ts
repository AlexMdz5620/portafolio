import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token');

    if (!token) {
        return NextResponse.json({ error: 'No autenticado.' }, { status: 401 });
    }

    try {
        const res = await fetch(`${process.env.API_URL}/auth/validate-user`, {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            }
        });

        if (res.ok) {
            return NextResponse.json({ authenticated: true });
        } else {
            return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error de verificación' }, { status: 500 })
    }
}