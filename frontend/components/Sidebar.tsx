"use client";

import { useState, useEffect } from 'react';
import { adminPage } from '@/data';
import { IntelligentNavLink } from './utils/IntelligentNavLink';
import { useRouteDetection } from '@/hooks/useRouteDetection';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Folder,
    Code,
    Link,
    User,
    BookOpen,
    Settings,
    Menu,
} from 'lucide-react';
import LogoutButton from './auth/LogoutButton';

// Mapeo de íconos para las páginas de admin
const iconMap: { [key: string]: React.ReactNode } = {
    '/admin': <LayoutDashboard className="h-5 w-5" />,
    '/admin/projects': <Folder className="h-5 w-5" />,
    '/admin/techs': <Code className="h-5 w-5" />,
    '/admin/links': <Link className="h-5 w-5" />,
    '/admin/user': <User className="h-5 w-5" />,
    '/admin/courses': <BookOpen className="h-5 w-5" />,
    '/admin/descriptions': <Settings className="h-5 w-5" />,
};

export default function AdminSidebar() {
    const { isAdminRoute, pathname } = useRouteDetection();
    const [isMobile, setIsMobile] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Detectar si es móvil
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!isAdminRoute) return null;

    const isActive = (url: string) => pathname === url;

    // Contenido del sidebar
    const sidebarContent = (
        <div className="flex flex-col max-h-full bg-gray-900 text-white">
            {/* Header del Sidebar */}
            <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold flex items-center">
                    <LayoutDashboard className="mr-3 h-6 w-6" />
                    Panel Admin
                </h2>
                <p className="text-gray-400 text-sm mt-1">Gestión del portafolio</p>
            </div>

            {/* Navegación */}
            <nav className="flex-1 p-4">
                <ul className="space-y-3">
                    {adminPage.map((page, idx) => (
                        <li key={idx}>
                            <IntelligentNavLink
                                href={page.url}
                                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${isActive(page.url)
                                    ? 'bg-[#be3144] text-white shadow-md'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                onClick={() => setMobileOpen(false)}
                            >
                                <span className="mr-3">
                                    {iconMap[page.url] || <LayoutDashboard className="h-5 w-5" />}
                                </span>
                                <span className="font-medium">{page.name}</span>
                            </IntelligentNavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer del Sidebar */}
            <div className="p-4 border-t border-gray-700">
                <div className="bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-300 text-sm mb-3">Sesión activa</p>
                    <LogoutButton />
                </div>
            </div>
        </div>
    );

    // Versión móvil con Sheet de ShadCN
    if (isMobile) {
        return (
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="fixed top-4 right-4 z-50 md:hidden bg-[#be3144] text-white hover:bg-[#fd0022]"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-80 bg-gray-900 border-gray-700">
                    <SheetTitle className="sr-only">Menú de Administración</SheetTitle>
                    {sidebarContent}
                </SheetContent>
            </Sheet>
        );
    }

    // Versión desktop - sidebar fijo
    return (
        <aside className="fixed left-0 w-64 bg-gray-900 shadow-lg z-40 flex flex-col">
            {sidebarContent}
        </aside>
    );
}