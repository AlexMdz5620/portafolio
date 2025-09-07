import { usePathname } from 'next/navigation';

export const useRouteDetection = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const isSobreMiPage = pathname === '/sobre-mi';
  const isProyectosPage = pathname === '/proyectos';
  const isTecnologiasPage = pathname === '/tecnologias';
  const isContactoPage = pathname === '/contacto';

  return {
    isHomePage,
    isSobreMiPage,
    isProyectosPage,
    isTecnologiasPage,
    isContactoPage,
    pathname
  };
};