'use client';

import { adminPage } from '@/data';
import { useAdminStore } from '@/store/adminStore';
import Link from 'next/link';

export default function AdminPage() {
  const { profile } = useAdminStore();

  if (profile) return (
    <section
      className="w-full bg-gradient-to-br from-[#3a3d40] to-[#181719]"
    >
      <div className='flex flex-col items-center justify-start pt-20 px-4 sm:px-8 md:px-16 lg:py-32 lg:px-32 min-h-screen'>

        <h1 className="text-white font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-6">
          Bienvenido Panel de Administración {profile.name} {profile.lastname}
        </h1>

        <div className="text-white md:text-center text-center md:text-lg leading-relaxed flex flex-col">
          <div>
            <p>Desde aquí podrás administrar la información de tu Portafolio de proyectos de programación.</p>
            <p>Dale click a los siguientes enlaces para empezar con la administración.</p>
          </div>
          <div id="tech" className="flex flex-col justify-center items-center text-center w-full px-8 py-8">
            {/* <h1 className="text-4xl font-bold text-white mb-6">Tecnologías que Conozco</h1> */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
              {adminPage.map((page, idx) => (
                <Link
                  key={idx}
                  href={page.url}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 border border-white/10"
                >
                  <p className="text-2xl font-semibold block mb-2">{page.name}</p>
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <p>Para ver como se va tu portafolio da click {''}
              <Link
                href="/"
                className='text-blue-600 hover:text-blue-400'
              >
                aquí
              </Link>
              .
            </p>
            <p>Recuerda que si quieres volver al Administrador coloca al final de la url &quot;/admin&quot; para volver aquí.</p>
          </div>
        </div>

      </div>
    </section>
  )
}
