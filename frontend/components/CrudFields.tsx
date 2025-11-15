"use client";

import ImageUpload from './ImageUpload';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
// import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
// import { FormDescription } from './ui/form';

export type TypeFields = {
    name: string
    label: string
    type: 'text' | 'textarea' | 'date' | 'image' | 'number' | 'radio' | 'select'
    required?: boolean
    options?: { value: string; label: string }[] // Para radio, select
    multiple?: boolean // Para checkbox (selección múltiple)
    placeholder?: string
}[]

interface CrudFieldsProps {
    fields: TypeFields
    formData: Record<string, unknown>
    setFormData: (data: Record<string, unknown>) => void
    operation: 'create' | 'edit' | 'delete' | 'view'
    folder?: string
}

export default function CrudFields({ fields, formData, setFormData, operation, folder }: CrudFieldsProps) {
    const isView = operation === 'view';

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
                        disabled={isView}
                        placeholder={field.placeholder}
                        className="bg-gray-800 border-gray-700 text-white"
                    />
                )

            case 'radio':
                if (!field.options) {
                    console.warn(`Radio field "${field.name}" needs options`);
                    return null;
                }

                return (
                    <RadioGroup
                        value={getFieldValue(field.name)}
                        onValueChange={(value) => handleFieldChange(field.name, value)}
                        disabled={isView}
                        className="flex flex-row space-y-2"
                    >
                        {field.options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value={option.value}
                                    id={`${field.name}-${option.value}`}
                                    className="text-blue-600 border-gray-400"
                                />
                                <Label
                                    htmlFor={`${field.name}-${option.value}`}
                                    className="text-sm text-gray-300 cursor-pointer"
                                >
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                )

            case 'textarea':
                return (
                    <>
                        <Textarea
                            value={getFieldValue(field.name)}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            required={field.required}
                            disabled={isView}
                            placeholder={field.placeholder}
                            rows={3}
                            className="bg-gray-800 border-gray-700 text-white resize-none"
                            maxLength={500}
                        />
                        {/* <FormDescription className="text-xs text-gray-500">
                            {field.value?.lenth || 0}/500 caracteres
                        </FormDescription> */}
                    </>
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
                            operation={operation}
                        />
                    </div>
                )

            case 'select':
                return (
                    <Select
                        value={getFieldValue(field.name)}
                        onValueChange={(value) => handleFieldChange(field.name, value)}
                        disabled={isView}
                    >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder={field.placeholder || "Seleccionar..."} />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            {field.options!.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className="focus:bg-gray-700 focus:text-white"
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
