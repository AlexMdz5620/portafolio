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
        <div className="flex flex-col h-full bg-linear-to-b from-gray-900 to-gray-800 text-white">
            {/* Header del Sidebar */}
            <div className="p-6 border-b border-gray-700/50 shrink-0 bg-gray-900/80 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-linear-to-r from-[#be3144] to-[#fd0022] rounded-lg">
                        <LayoutDashboard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Panel Admin
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">Gestión del portafolio</p>
                    </div>
                </div>
            </div>

            {/* Navegación - Contenedor con scroll */}
            <nav className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-2 px-4">
                    {adminPage.map((page, idx) => (
                        <li key={idx}>
                            <IntelligentNavLink
                                href={page.url}
                                className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 border border-transparent ${
                                    isActive(page.url)
                                        ? 'bg-linear-to-r from-[#be3144] to-[#fd0022] text-white shadow-lg shadow-red-500/25 border-red-400/30'
                                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-gray-600/50 hover:shadow-md'
                                }`}
                                onClick={() => setMobileOpen(false)}
                            >
                                <span className={`mr-3 transition-transform duration-300 ${
                                    isActive(page.url) ? 'scale-110' : 'group-hover:scale-110'
                                }`}>
                                    {iconMap[page.url] || <LayoutDashboard className="h-5 w-5" />}
                                </span>
                                <span className="font-medium">{page.name}</span>
                            </IntelligentNavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Footer del Sidebar */}
            <div className="p-4 border-t border-gray-700/50 shrink-0 bg-gray-900/80 backdrop-blur-sm">
                <div className="bg-linear-to-r from-gray-800 to-gray-700 rounded-xl p-4 border border-gray-600/30">
                    <p className="text-gray-300 text-sm mb-3 font-medium">Sesión activa</p>
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
                        className="fixed top-4 right-4 z-50 md:hidden bg-linear-to-r from-[#be3144] to-[#fd0022] text-white hover:from-[#fd0022] hover:to-[#be3144] shadow-lg"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent 
                    side="left" 
                    className="p-0 w-80 bg-linear-to-b from-gray-900 to-gray-800 border-gray-700 flex flex-col h-full"
                >
                    <SheetTitle className="sr-only">Menú de Administración</SheetTitle>
                    {sidebarContent}
                </SheetContent>
            </Sheet>
        );
    }

    // Versión desktop - sidebar fijo con altura completa
    return (
        <aside className="fixed left-0 top-0 w-64 h-screen bg-linear-to-b from-gray-900 to-gray-800 shadow-2xl z-40 flex flex-col border-r border-gray-700/50">
            {sidebarContent}
        </aside>
    );
}