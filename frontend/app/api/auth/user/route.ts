import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  try {
    // Obtener información del usuario desde /auth/me
    const response = await fetch(`${process.env.API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });

    if (response.ok) {
      const userData = await response.json();
      return NextResponse.json(userData);
    } else {
      return NextResponse.json({ error: 'Error obteniendo usuario' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Error de conexión' }, { status: 500 });
  }
}