import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${raleway.variable}`}>
      <body
        className="font-sans text-[#f0f0f0]"
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
