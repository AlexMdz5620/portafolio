import { usePathname } from 'next/navigation';

export const useRouteDetection = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const isAdminRoute = pathname.startsWith('/admin');


  return {
    pathname,
    isHomePage,
    isAdminRoute,
  };
};