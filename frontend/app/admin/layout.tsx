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
      <div className="min-h-screen bg-gray-100">
        <AuthHydrator profile={profile}/>
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
