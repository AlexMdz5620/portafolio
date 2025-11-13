'use client';

import { login } from '@/actions/login.action';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

export default function LoginForm() {
    const [state, dispatch] = useActionState(login, { errors: [] });

    useEffect(() => {
        if (state && state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            });
        };
    });

    return (
        <form
            action={dispatch}
            className="space-y-4"
            noValidate
        >
            <div className='space-y-2'>
                <label
                    htmlFor='email'
                    className="block text-white mb-2"
                >
                    Correo Electrónico
                </label>
                <input
                    type="email"
                    id='email'
                    name='email'
                    placeholder='ejemplo@ejemplo.com'
                    className="w-full px-4 py-3 bg-[#45567d] border border-[#303841] rounded-lg text-white placeholder-gray-400 focus:border-[#be3144] focus:outline-none transition-colors"
                />
            </div>
            <div className='space-y-2'>
                <label
                    htmlFor='password'
                    className="block text-white mb-2"
                >
                    Contraseña
                </label>
                <input
                    type="password"
                    id='password'
                    name='password'
                    className="w-full px-4 py-3 bg-[#45567d] border border-[#303841] rounded-lg text-white placeholder-gray-400 focus:border-[#be3144] focus:outline-none transition-colors"
                />
            </div>
            <input
                type="submit"
                value='Iniciar Sesión'
                className="w-full bg-[#be3144] hover:bg-[#45567d] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            />
        </form>
    )
}
