import { redirect } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token'); // o usa zustand

  if (!token) {
    redirect('/');
  }

  return (
    <div className="dashboard-layout">
      <header> {/* Botón logout aquí */} </header>
      <main>{children}</main>
    </div>
  );
}
