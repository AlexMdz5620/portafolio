import { usePathname } from 'next/navigation';

export const useRouteDetection = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const isSobreMiPage = pathname === '/sobre-mi';
  const isProyectosPage = pathname === '/proyectos';
  const isTecnologiasPage = pathname === '/tecnologias';
  const isContactoPage = pathname === '/contacto';
  const isAdminPage = pathname === '/admin';
  const isAdminCoursePage = pathname === '/admin/courses';
  const isAdminDescriptionPage = pathname === '/admin/descriptions';
  const isAdminLinkPage = pathname === '/admin/links';
  const isAdminProjectPage = pathname === '/admin/projects';
  const isAdminTechPage = pathname === '/admin/techs';
  const isAdminUserPage = pathname === '/admin/user';

  return {
    isHomePage,
    isSobreMiPage,
    isProyectosPage,
    isTecnologiasPage,
    isContactoPage,
    pathname,
    isAdminPage,
    isAdminCoursePage,
    isAdminDescriptionPage,
    isAdminLinkPage,
    isAdminProjectPage,
    isAdminTechPage,
    isAdminUserPage,
  };
};