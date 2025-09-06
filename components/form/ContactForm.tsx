'use client';

import { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaUser, FaTag } from 'react-icons/fa';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Aquí implementarás el envío del formulario
            // Por ahora simulamos una espera
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulación de envío exitoso
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Resetear el estado después de 3 segundos
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            {submitStatus === 'success' && (
                <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded mb-6">
                    ¡Mensaje enviado con éxito! Te responderé pronto.
                </div>
            )}

            {submitStatus === 'error' && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
                    Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-white mb-2">
                        <FaUser className="inline mr-2" /> Nombre Completo
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#45567d] border border-[#303841] rounded-lg text-white placeholder-gray-400 focus:border-[#be3144] focus:outline-none transition-colors"
                        placeholder="Tu nombre completo"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-white mb-2">
                        <FaEnvelope className="inline mr-2" /> Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#45567d] border border-[#303841] rounded-lg text-white placeholder-gray-400 focus:border-[#be3144] focus:outline-none transition-colors"
                        placeholder="tu.email@ejemplo.com"
                    />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-white mb-2">
                        <FaTag className="inline mr-2" /> Asunto
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#45567d] border border-[#303841] rounded-lg text-white placeholder-gray-400 focus:border-[#be3144] focus:outline-none transition-colors"
                        placeholder="¿De qué quieres hablar?"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-white mb-2">
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-[#45567d] border border-[#303841] rounded-lg text-white placeholder-gray-400 focus:border-[#be3144] focus:outline-none transition-colors resize-none"
                        placeholder="Cuéntame sobre tu proyecto..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#be3144] hover:bg-[#45567d] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Enviando...
                        </>
                    ) : (
                        <>
                            <FaPaperPlane className="mr-2" />
                            Enviar Mensaje
                        </>
                    )}
                </button>
            </form>
        </>
    )
}
