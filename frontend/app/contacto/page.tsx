"use client";

import ContactForm from '@/components/form/ContactForm';
import SocialNetLink from '@/components/ui/Link';
import { usePublicStore } from '@/store/publicStore';

export default function ContactoPage() {
    const { profile } = usePublicStore();
    const links = profile?.links;

    return (
        <div className="pt-4 min-h-screen bg-linear-to-b from-[#3a3d40] to-[#181719]">
            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-6">
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
                    <div className="space-y-4">
                        <div className="bg-[#303841] p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-white mb-3">Información de Contacto</h2>
                            <div className="space-y-2">
                                {links && links.filter(link => link.active).map(link => (
                                    <div
                                        key={link.link} 
                                        className="flex items-center">
                                        <SocialNetLink
                                            key={link.id}
                                            link={link}
                                        >
                                            <h3 className="text-white font-semibold hover:text-[#be3144] duration-150 px-2">{link.name}</h3>

                                        </SocialNetLink>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#303841] p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-white mb-3">¿Por qué contactarme?</h2>
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
                                <li className="flex items-start">
                                    <span className="text-[#be3144] mr-2">•</span>
                                    <span>Consultoría en desarrollo web</span>
                                </li>
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
