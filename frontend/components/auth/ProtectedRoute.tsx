'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const [authStatus, setAuthStatus] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking');
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/auth/verify');
                if (response.ok) {
                    setAuthStatus('authenticated');
                } else {
                    setAuthStatus('unauthenticated');
                    router.push('/auth');
                }
            } catch (error) {
                setAuthStatus('unauthenticated');
                console.log(error);
                router.push('/auth')
            }
        }

        checkAuth();
    }, [router]);

    if (authStatus === 'checking') {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#3a3d40] to-[#181719]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#be3144]"></div>
            </div>
        );
    }

    if (authStatus === 'unauthenticated') {
        return null;
    }

    return <>{children}</>;
}