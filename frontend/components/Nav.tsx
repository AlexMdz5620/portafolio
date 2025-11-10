"use client";

import { useEffect, useState } from 'react';
import { IntelligentNavLink } from './utils/IntelligentNavLink';
import { useRouteDetection } from '@/hooks/useRouteDetection';
import { Menu } from 'lucide-react';

export default function Nav() {
  const [mounted, setMounted] = useState(false);
  const { isAdminRoute, isHomePage } = useRouteDetection();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isAdminRoute) return null;

  return (
    <nav className="fixed top-0 left-0 w-full shadow-md z-50 bg-[#be3144]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - siempre visible */}
          <div className="shrink-0 flex items-stretch">
            {!isHomePage && !isAdminRoute && (
              <IntelligentNavLink
                href={isAdminRoute ? "/admin" : "/"}
                className="text-white hover:bg-[#45567d] px-6 py-4.5 text-lg font-medium transition-colors duration-300 block"
              >
                {isAdminRoute || !isHomePage && "Inicio"}
              </IntelligentNavLink>
            )}

          </div>

          {/* 🆕 EN ADMIN: Solo mostrar logout y botón móvil */}
          {isAdminRoute ? (
            <div className="flex items-center space-x-4">
              {/* Botón móvil para sidebar - se oculta en desktop */}
              <button className="md:hidden text-white p-2 hover:bg-[#45567d] rounded-md transition-colors duration-300">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          ) : (
            /* Navbar normal para páginas públicas */
            <div className="hidden md:flex items-stretch h-16">
              <ul className="flex space-x-0">
                <li className="flex items-stretch">
                  <IntelligentNavLink
                    href="#welcome-section"
                    className="text-white hover:bg-[#45567d] px-6 py-4 text-lg font-medium transition-colors duration-300 block"
                  >
                    Sobre Mi
                  </IntelligentNavLink>
                </li>
                <li className="flex items-stretch">
                  <IntelligentNavLink
                    href="#projects"
                    className="text-white hover:bg-[#45567d] px-6 py-4 text-lg font-medium transition-colors duration-300 block"
                  >
                    Proyectos
                  </IntelligentNavLink>
                </li>
                {
                  isHomePage && (
                    <li className="flex items-stretch">
                      <IntelligentNavLink
                        href="#tech"
                        className="text-white hover:bg-[#45567d] px-6 py-4 text-lg font-medium transition-colors duration-300 block"
                      >
                        Tecnologías
                      </IntelligentNavLink>
                    </li>
                  )
                }
                <li className="flex items-stretch">
                  <IntelligentNavLink
                    href="/contacto"
                    className="text-white hover:bg-[#45567d] px-6 py-4 text-lg font-medium transition-colors duration-300 block"
                  >
                    Contacto
                  </IntelligentNavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}