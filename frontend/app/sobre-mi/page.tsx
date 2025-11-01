"use client";

import ImagePorfile from '@/components/ui/ImagePorfile';
import { usePublicStore } from '@/store/publicStore';
import Image from 'next/image';

export default function SobreMiPage() {
  const { profile, courses } = usePublicStore();
  const descriptions = profile?.descriptions

  if (profile) return (
    <div className="pt-16">
      {/* Sección de Bienvenida */}
      <section className="flex flex-col items-center justify-start w-full bg-gradient-to-br from-[#3a3d40] to-[#181719] pt-10 sm:px-8 md:px-16 lg:px-32">
        <div className='flex flex-col items-center justify-start px-4 sm:px-8 md:px-16 lg:px-32 min-h-screen'>
          <ImagePorfile
            img={profile.photo_url}
            name={profile.name}
            lastname={profile.lastname}
          />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 font-heading">
            Hola soy {profile.name} {profile.lastname}
          </h1>

          <div className="max-w-4xl text-center space-y-6">

            {/* Maestro en Cultura Física, apasionado por el desarrollo web en busca de abrirse camino en este maravilloso mundo tecnológico,
            con ansias de trabajar en nuevos proyectos que me reten y estimulen mi crecimiento como programador y persona.
            ¿Ya viste mis proyectos? sino da click{" "}
            <Link href="/proyectos" className="text-[#45567d] underline hover:text-[#bababa] transition-colors">
              aquí
            </Link>{" "}
            para verlos. */}
            {descriptions?.map(desc => {
              const about = desc.type
              if (about === 'about') return (
                <p
                  key={desc.id}
                  className="text-lg md:text-xl text-white leading-relaxed">
                  {desc.content}
                </p>
              )
            })}
          </div>
        </div>
      </section>

      {/* Sección de Cursos */}
      <section className="text-center py-12 bg-[#45567d] px-4 sm:px-8">
        <div className='flex flex-col items-center justify-start px-4 sm:px-8 md:px-16 lg:px-32 min-h-screen'>

          <h2 className="max-w-2xl mx-auto mb-16 pb-4 border-b-2 border-white text-3xl md:text-4xl font-bold text-white font-heading">
            Algunos Cursos que he hecho o están en curso
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {courses && (courses.map((course) => (
              <div
                key={course.id}
                className="bg-[#303841] shadow-lg rounded overflow-hidden transition-transform duration-300 hover:scale-105 h-80 flex flex-col"
              >
                <div className="h-56 overflow-hidden">
                  <Image
                    src={course.img_url}
                    alt={course.title}
                    width={300}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-grow flex items-center justify-center">
                  <p className="text-white text-lg font-medium text-center">
                    &lt; {course.title} /&gt;
                  </p>
                </div>
              </div>
            )))}
          </div>
        </div>
      </section>
    </div>
  );
}