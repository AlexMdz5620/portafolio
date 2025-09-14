import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { publicService } from '@/service/publicService';
import PublicHydrator from '@/components/utils/PublicHydrator';

const poppins = Poppins({
  weight: ['200', '400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const raleway = Raleway({
  weight: ['700'],
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Portafolio Personal",
  description: "Portafolio de los poryectos personales.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const [profile, projects, techs, courses] = await Promise.all([
      publicService.getProfile(),
      publicService.getProjects(),
      publicService.getTech(),
      publicService.getCourses(),
    ]);

    const initialData = { profile, projects, techs, courses };

    return (
      <html lang="es" className={`${poppins.variable} ${raleway.variable}`}>
        <body
          className="font-sans text-[#f0f0f0]"
        >
          <Nav />
          <PublicHydrator initialData={initialData} />
          {children}
          <Footer />
        </body>
      </html>
    );
  } catch (error) {
    console.error("Error cargando datos públicos en layout:", error);
    return (
      <html lang="es">
        <body>
          {children}
        </body>
      </html>
    );
  }
}
