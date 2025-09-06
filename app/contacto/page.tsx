
import ContactForm from '@/components/form/ContactForm';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function ContactoPage() {
    return (
        <div className="pt-16 min-h-screen bg-gradient-to-b from-[#3a3d40] to-[#181719]">
            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
                        Contacto
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        ¿Tienes un proyecto en mente? Hablemos y hagámoslo realidad.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Formulario de Contacto */}
                    <div className="bg-[#303841] p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold text-white mb-6">Envíame un mensaje</h2>
                        <ContactForm />                        
                    </div>

                    {/* Información de Contacto */}
                    <div className="space-y-6">
                        <div className="bg-[#303841] p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-white mb-6">Información de Contacto</h2>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <a
                                        href="https://github.com/AlexMdz5620"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex text-gray-300 hover:text-white transition-colors"
                                    >
                                        <FaGithub className="text-[#be3144] text-xl mr-4" />
                                        <div>
                                            <h3 className="text-white font-semibold">GitHub</h3>
                                        </div>
                                    </a>
                                </div>

                                <div className="flex items-center">
                                    <a
                                        href="https://www.linkedin.com/in/manuel-alejandro-mendoza-c%C3%A1rdenas-133967274/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex text-gray-300 hover:text-white transition-colors"
                                    >
                                        <FaLinkedin className="text-[#be3144] text-xl mr-4" />
                                        <div>
                                            <h3 className="text-white font-semibold">

                                                LinkedIn
                                            </h3>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#303841] p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-white mb-6">¿Por qué contactarme?</h2>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-[#be3144] mr-2">•</span>
                                    <span>Desarrollo de proyectos web personalizados</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#be3144] mr-2">•</span>
                                    <span>Colaboración en proyectos interesantes</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-[#be3144] mr-2">•</span>
                                    <span>Oportunidades laborales</span>
                                </li>
                                {/* <li className="flex items-start">
                                    <span className="text-[#be3144] mr-2">•</span>
                                    <span>Consultoría en desarrollo web</span>
                                </li> */}
                                <li className="flex items-start">
                                    <span className="text-[#be3144] mr-2">•</span>
                                    <span>¡O simplemente para tomar un café virtual!</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
