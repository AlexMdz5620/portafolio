"use client";

import ImageUpload from './ImageUpload';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface CrudFieldsProps {
    fields: Array<{
        name: string
        label: string
        type: 'text' | 'textarea' | 'date' | 'image' | 'number'
        required?: boolean
    }>
    formData: Record<string, unknown>
    setFormData: (data: Record<string, unknown>) => void
    folder?: string
}

export default function CrudFields({ fields, formData, setFormData, folder }: CrudFieldsProps) {
    // Función para controlar el cambio de valores del input
    const handleFieldChange = (name: string, value: unknown) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // Función para obtener el valor con tipo seguro
    const getFieldValue = (fieldName: string): string => {
        const value = formData[fieldName];

        // Convertir a string de manera segura
        if (value === null || value === undefined) {
            return '';
        }

        if (typeof value === 'string') {
            return value;
        }

        if (typeof value === 'number') {
            return value.toString();
        }

        if (typeof value === 'boolean') {
            return value.toString();
        }

        return '';
    }

    // Función para obtener URL de imagen de manera segura
    const getImageUrl = (fieldName: string): string | undefined => {
        const value = formData[fieldName];

        if (typeof value === 'string' && value) {
            return value;
        }

        return undefined;
    }

    const renderField = (field: typeof fields[0]) => {
        switch (field.type) {
            case 'text':
            case 'date':
            case 'number':
                return (
                    <Input
                        type={field.type}
                        value={getFieldValue(field.name)}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        required={field.required}
                        className="bg-gray-800 border-gray-700 text-white"
                    />
                )

            case 'textarea':
                return (
                    <Textarea
                        value={getFieldValue(field.name)}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        required={field.required}
                        rows={3}
                        className="bg-gray-800 border-gray-700 text-white"
                    />
                )

            case 'image':
                return (
                    <div
                        className="focus:outline-none focus:ring-0"
                        // 🆕 Prevenir cualquier comportamiento de foco
                        onFocus={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                        tabIndex={-1}
                    >
                        <ImageUpload
                            onImageUpload={(url) => handleFieldChange(field.name, url)}
                            existingImageUrl={getImageUrl(field.name)}
                            folder={folder}
                        />
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {fields.map(field => (
                <div
                    key={field.name}
                    className={field.type === 'textarea' || field.type === 'image' ? 'md:col-span-2' : ''}
                >
                    <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        {field.label} {field.required && '*'}
                    </label>
                    {renderField(field)}
                </div>
            ))}
        </div>
    )
}
