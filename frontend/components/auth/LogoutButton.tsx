'use client';

import { logout } from '@/actions/logout.action';
import { Button } from '../ui/button';

export default function LogoutButton() {
  return (
    <Button
      variant="destructive"
      className="w-full hover:bg-gray-700 hover:text-white cursor-pointer duration-300"
      onClick={async () => {
        await logout();
      }}
    >
      Cerrar Sesión
    </Button>
  );
}