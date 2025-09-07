import ImagePorfile from '@/components/ui/ImagePorfile';
import Image from 'next/image';
import Link from 'next/link';

// Datos de los cursos
const courses = [
  {
    id: 1,
    image: "/cursos/De.f/Captura de pantalla 2024-07-13 094641.png",
    title: "Máster en Coding"
  },
  {
    id: 2,
    image: "/cursos/Santander/santander-cienciaDeDatos.png",
    title: "Introducción a la Ciencia de Datos"
  },
  {
    id: 3,
    image: "/cursos/Santander/santander-IOT.png",
    title: "El Internet de las Cosas"
  },
  {
    id: 4,
    image: "/cursos/LinkedIn/linkedin-basico.png",
    title: "Fundamentos Profesionales del Desarrollo de Software"
  },
  {
    id: 5,
    image: "/cursos/freeCampCode/freeCampCode-designe.png",
    title: "Responsive Web Desing"
  },
  {
    id: 6,
    image: "/cursos/CodeSignal/codeSignal-certificate.png",
    title: "Full-Stack Engineering with JavaScript"
  },
  {
    id: 7,
    image: "/cursos/Cisco/cisco-introCienciaDeDAtos.png",
    title: "Introduction to Data Science"
  },
  {
    id: 8,
    image: "/cursos/Cisco/cisco-python.png",
    title: "Python Essentials I"
  },
  {
    id: 9,
    image: "/cursos/Aprende.org/Aprende.org-computoBasico.png",
    title: "Computo Básico"
  },
  {
    id: 10,
    image: "/cursos/Aprende.org/Aprende.org-tecnico.png",
    title: "Técnico en Informática (Ofimática)"
  }
];

export default function SobreMiPage() {
  return (
    <div className="pt-16"> {/* Espacio para el navbar fijo */}
      {/* Sección de Bienvenida */}
      <section className="flex flex-col items-center justify-start w-full bg-gradient-to-br from-[#3a3d40] to-[#181719] py-10 sm:px-8 md:px-16 lg:px-32">
        <ImagePorfile />
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 font-heading">
          Hola soy Alex Mendoza
        </h1>
        
        <div className="max-w-4xl text-center space-y-6">
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Maestro en Cultura Física, apasionado por el desarrollo web en busca de abrirse camino en este maravilloso mundo tecnológico, 
            con ansias de trabajar en nuevos proyectos que me reten y estimulen mi crecimiento como programador y persona. 
            ¿Ya viste mis proyectos? sino da click{" "}
            <Link href="/proyectos" className="text-[#45567d] underline hover:text-[#bababa] transition-colors">
              aquí
            </Link>{" "}
            para verlos.
          </p>
          
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Buscando la manera de facilitar el trabajo de mis compañeros Entrenadores Deportivos brindándoles soluciones 
            teórico prácticas en el desarrollo de sus Macrociclos de Entrenamiento (En desarrollo).
          </p>
        </div>
      </section>

      {/* Sección de Cursos */}
      <section className="text-center py-12 bg-[#45567d] px-4 sm:px-8">
        <h2 className="max-w-2xl mx-auto mb-16 pb-4 border-b-2 border-white text-3xl md:text-4xl font-bold text-white font-heading">
          Algunos Cursos que he hecho o están en curso
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#303841] shadow-lg rounded overflow-hidden transition-transform duration-300 hover:scale-105 h-80 flex flex-col"
            >
              <div className="h-56 overflow-hidden">
                <Image
                  src={course.image}
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
          ))}
        </div>
      </section>
    </div>
  );
}