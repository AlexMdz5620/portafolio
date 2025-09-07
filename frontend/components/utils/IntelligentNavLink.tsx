'use client';

import Link from 'next/link';
import { useRouteDetection } from '@/hooks/useRouteDetection';
import { SmoothScrollLink } from './SmoothScrollLink';

interface IntelligentNavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const IntelligentNavLink = ({ href, children, className, onClick }: IntelligentNavLinkProps) => {
    const { isHomePage } = useRouteDetection();

    // Si es un enlace a sección y estamos en homepage, usar scroll suave
    if (href.startsWith('#') && isHomePage) {
        return (
            <SmoothScrollLink href={href} className={className} onClick={onClick}>
                {children}
            </SmoothScrollLink>
        );
    }

    // Si es un enlace a sección pero NO estamos en homepage, redirigir a homepage con hash
    if (href.startsWith('#') && !isHomePage) {
        let hrefClean = href.replace('#', '');
        
        switch (hrefClean) {
            case "welcome-section":
                hrefClean = "sobre-mi";
                break;
            case "projects":
                hrefClean = "proyectos";
                break;
        }
        
        return (
            <Link href={`/${hrefClean}`} className={className}>
                {children}
            </Link>
        );
    }

    // Para enlaces normales (páginas)
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
};