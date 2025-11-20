import Sidebar from '@/components/Sidebar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AuthHydrator from '@/components/utils/AuthHydrator';
import { adminCourseService, adminDescriptionService, adminLinkService, adminProfileService, adminProjectService, adminTechService } from '@/service/authService';
import { cookies } from 'next/headers';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');
  const auth = {
    'Authorization': `Bearer ${token?.value}`
  };

  const [
    profile,
    projects,
    courses,
    techs,
    links,
    descriptions
  ] = await Promise.all([
    adminProfileService.getProfile(auth),
    adminProjectService.findAll(auth),
    adminCourseService.findAll(auth),
    adminTechService.findAll(auth),
    adminLinkService.findAll(auth),
    adminDescriptionService.getAll(auth)
  ]);

  return (
    <ProtectedRoute>
      <div className="">
        <AuthHydrator
          profile={profile}
          projects={projects}
          courses={courses}
          techs={techs}
          links={links}
          descriptions={descriptions}
        />
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
