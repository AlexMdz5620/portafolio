'use client';

import { logout } from '@/actions/logout.action';

export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await logout();
      }}
      className="text-white hover:bg-[#45567d] px-6 py-4 text-lg font-medium transition-colors duration-300 block"
    >
      Cerrar Sesión
    </button>
  );
}