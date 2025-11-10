import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AuthHydrator from '@/components/utils/AuthHydrator';
import { adminProfileService } from '@/service/authService';
import { cookies } from 'next/headers';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');
  const auth = {
    'Authorization': `Bearer ${token?.value}`
  };

  const [profile] = await Promise.all([
    adminProfileService.getProfile(auth),
  ]);

  return (
    <ProtectedRoute>
      <div className="">
        <AuthHydrator profile={profile} />
        <Sidebar />
        <main className="md:ml-64 ">
          <div>
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
