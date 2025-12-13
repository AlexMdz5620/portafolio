'use client';

import { sendEmail } from '@/actions/send-mails.action';
import type { ContactForm } from '@/schemas/zodSchema';
import { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaUser, FaTag } from 'react-icons/fa';
import { toast } from 'sonner';

export default function ContactForm() {
    const [formData, setFormData] = useState<ContactForm>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar error del campo al editar
        if (validationErrors[name as keyof ContactForm]) {
            setValidationErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setValidationErrors({});

        try {
            // Aquí implementarás el envío del formulario
            // Por ahora simulamos una espera
            // await new Promise(resolve => setTimeout(resolve, 2000));
            // Simulación de envío exitoso
            // setFormData({ name: '', email: '', subject: '', message: '' });
            // toast.success('¡Mensaje enviado con éxito! Te responderé pronto.', { position: 'bottom-right' });

            const result = await sendEmail(formData);

            if (result.success) {
                setFormData({ name: '', email: '', subject: '', message: '' });
                toast.success(result.message || '¡Mensaje enviado con éxito! Te responderé pronto.',
                    {
                        position: 'bottom-right',
                        duration: 5000
                    });
            } else {
                if (result.errors) {
                    setValidationErrors(result.errors);
                    toast.error('Por favor, corrige los errores en el formulario.', {
                        position: 'bottom-right'
                    });
                } else {
                    toast.error(result.message || 'Hubo un error al enviar el mensaje.', {
                        position: 'bottom-right'
                    });
                }
            }
        } catch (error) {
            console.error('Error inesperado:', error);
            toast.error('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', { position: 'bottom-right' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getError = (field: keyof ContactForm) => {
        return validationErrors[field] ? (
            <p className="mt-1 text-red-400 text-sm">{validationErrors[field]}</p>
        ) : null;
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-1">
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
                    {getError('name')}
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
                    {getError('email')}
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
                    {getError('subject')}
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
                    {getError('message')}
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

                <p className="text-gray-400 text-xs text-center mt-2">
                    Usamos Resend para enviar emails. Tu mensaje llegará directamente a mi bandeja.
                </p>
            </form>
        </>
    )
}
