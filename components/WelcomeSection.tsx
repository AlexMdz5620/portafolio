import Link from 'next/link';
import { FaChevronRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import ImagePorfile from './ui/ImagePorfile';

export default function WelcomeSection() {
    return (
        <section
            id="welcome-section"
            className="w-full bg-gradient-to-br from-[#3a3d40] to-[#181719]"
        >
            <div className='flex flex-col items-center justify-start pt-20 px-4 sm:px-8 md:px-16 lg:py-32 lg:px-32 min-h-screen'>
                {/* Títulos */}
                <h1 className="text-white font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-center mb-6">
                    Hola, soy Alex Mendoza
                </h1>

                {/* Imagen de perfil */}
                <div className="flex flex-col w-full md:flex-row items-center justify-around gap-8 mb-8 mt-8 lg:mb-12 lg:mt-0">
                    <ImagePorfile />
                    <div className='flex flex-col items-center gap-3'>
                        <p className="text-[#be3144] text-xl md:text-2xl lg:text-3xl font-light italic text-center">
                            Desarrollador Web FullStack
                        </p>
                        <p className="text-[#be3144] text-xl md:text-2xl lg:text-3xl font-light italic text-center">
                            Bienvenido a mi portafolio
                        </p>
                    </div>
                </div>

                {/* Contenedor de dos columnas */}
                <div className="flex md:flex-row mb-8 lg:mb-12">

                    <div className="text-white md:text-center text-center md:text-lg leading-relaxed flex-1">
                        <p>
                            Maestro en Cultura Física apasionado por el desarrollo web, buscando abrirse campo en este mundo tecnológico,
                            con ansias de trabajar en nuevos proyectos que me reten y estimulen mi crecimiento como programador y persona.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-start justify-center flex-1 gap-6">
                        {/* Enlaces sociales */}
                        <div className="flex justify-center space-x-6 w-full">
                            <a
                                href="https://github.com/AlexMdz5620"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white text-3xl hover:text-[#be3144] transition-colors duration-300"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/manuel-alejandro-mendoza-c%C3%A1rdenas-133967274/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white text-3xl hover:text-[#be3144] transition-colors duration-300"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                        </div>

                        {/* Botón */}
                        <div className='flex w-full justify-center'>
                            <Link
                                href="/sobre-mi"
                                className="bg-[#be3144] text-white px-3 py-1 lg:px-6 lg:py-3 rounded transition-colors duration-300 hover:bg-[#45567d] inline-flex items-center text-lg"
                            >
                                Más Sobre Mi <FaChevronRight className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}