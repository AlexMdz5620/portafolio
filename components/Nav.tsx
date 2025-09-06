"use client";

import { useState } from 'react';
import { IntelligentNavLink } from './utils/IntelligentNavLink';
import { useRouteDetection } from '@/hooks/useRouteDetection';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isHomePage } = useRouteDetection();

  return (
    <nav className="fixed top-0 left-0 w-full shadow-md z-50 bg-[#be3144]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo o marca - agregué esto para mejor estructura */}
          <div className="flex-shrink-0 flex items-stretch">
            {!isHomePage && (
              <IntelligentNavLink
                href="/"
                className="text-white hover:bg-[#45567d] px-6 py-4 text-lg font-bold transition-colors duration-300 block"
              >
                Inicio
              </IntelligentNavLink>
            )}
          </div>

          {/* Elementos de navegación para desktop */}
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
              {isHomePage &&
                (<li className="flex items-stretch">
                  <IntelligentNavLink
                    href="#tech"
                    className="text-white hover:bg-[#45567d] px-6 py-4 text-lg font-medium transition-colors duration-300 block"
                  >
                    Tecnologías
                  </IntelligentNavLink>
                </li>)
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

          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-[#45567d] focus:outline-none transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#be3144]">
          <div className="px-2 pt-2 pb-3 space-y-0 sm:px-3">
            <IntelligentNavLink
              href="#welcome-section"
              className="text-white hover:bg-[#45567d] block px-3 py-4 rounded-md text-base font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Mi
            </IntelligentNavLink>
            <IntelligentNavLink
              href="#projects"
              className="text-white hover:bg-[#45567d] block px-3 py-4 rounded-md text-base font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Proyectos
            </IntelligentNavLink>
            <IntelligentNavLink
              href="#tech"
              className="text-white hover:bg-[#45567d] block px-3 py-4 rounded-md text-base font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Tecnologías
            </IntelligentNavLink>
            <IntelligentNavLink
              href="/contacto"
              className="text-white hover:bg-[#45567d] block px-3 py-4 rounded-md text-base font-medium transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </IntelligentNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}