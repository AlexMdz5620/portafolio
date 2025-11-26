"use client";

import ImageUpload from '../ImageUpload';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';

export type TypeFields = {
    name: string
    label: string
    type: 'text' | 'textarea' | 'date' | 'image' | 'number' | 'radio' | 'select' | 'checkbox' | 'password'
    required?: boolean
    options?: { value: string; label: string }[]
    multiple?: boolean
    placeholder?: string
    maxLength?: number
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
    const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({}); // ← Estado para visibilidad de passwords

    // Función para toggle de visibilidad de contraseña
    const togglePasswordVisibility = (fieldName: string) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [fieldName]: !prev[fieldName]
        }));
    };

    // Función para controlar el cambio de valores del input
    const handleFieldChange = (name: string, value: unknown) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    // Función específica para checkboxes (múltiples valores)
    const handleCheckboxChange = (fieldName: string, optionValue: string, checked: boolean) => {
        const currentValue = formData[fieldName];
        let newValue: string[];

        // Inicializar como array si no existe
        if (!currentValue || !Array.isArray(currentValue)) {
            newValue = [];
        } else {
            newValue = [...currentValue as string[]];
        }

        if (checked) {
            // Agregar valor si no existe
            if (!newValue.includes(optionValue)) {
                newValue.push(optionValue);
            }
        } else {
            // Remover valor
            newValue = newValue.filter(val => val !== optionValue);
        }

        setFormData({
            ...formData,
            [fieldName]: newValue,
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

    // Función para obtener valores de checkbox (array)
    const getCheckboxValues = (fieldName: string): string[] => {
        const value = formData[fieldName];

        if (Array.isArray(value)) {
            return value as string[];
        }

        return [];
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
            case 'password':
                const isPasswordVisible = visiblePasswords[field.name] || false;
                return (
                    <div className='relative'>
                        <Input
                            type={isPasswordVisible ? 'text' : 'password'}
                            value={getFieldValue(field.name)}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            required={field.required}
                            disabled={isView}
                            placeholder={field.placeholder}
                            className="bg-gray-800 border-gray-700 text-white pr-10"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => togglePasswordVisibility(field.name)}
                        >
                            {isPasswordVisible ? (
                                <EyeClosed className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </Button>
                    </div>
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
                const textValue = getFieldValue(field.name);
                const maxLength = field.maxLength || 500; // Usar maxLength del field o 500 por defecto
                const charCount = textValue.length;
                const isNearLimit = charCount > maxLength * 0.8; // 80% del límite

                return (
                    <div className="relative">
                        <Textarea
                            value={getFieldValue(field.name)}
                            onChange={(e) => handleFieldChange(field.name, e.target.value)}
                            required={field.required}
                            disabled={isView}
                            placeholder={field.placeholder}
                            rows={3}
                            className={`bg-gray-800 border-gray-700 text-white resize-none pr-20 ${charCount > maxLength ? 'border-red-500' : ''
                                }`}
                            maxLength={maxLength}
                        />
                        <div className={`absolute bottom-2 right-2 text-xs ${charCount > maxLength
                                ? 'text-red-400'
                                : isNearLimit
                                    ? 'text-yellow-400'
                                    : 'text-gray-400'
                            }`}>
                            {charCount}/{maxLength}
                        </div>
                    </div>
                )

            case 'image':
                return (
                    <div
                        className="focus:outline-none focus:ring-0"
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

            case 'checkbox':
                if (!field.options) {
                    const boolValue = !!formData[field.name]; // Convertir a booleano
                    return (
                        <div className="flex items-center justify-center space-x-2">
                            <Checkbox
                                id={field.name}
                                checked={boolValue}
                                onCheckedChange={(checked) =>
                                    handleFieldChange(field.name, checked)
                                }
                                disabled={isView}
                                className="text-blue-600 border-gray-400 data-[state=checked]:bg-blue-600"
                            />
                        </div>
                    );
                }

                const checkboxValues = getCheckboxValues(field.name);

                return (
                    <div className="space-y-3">
                        {field.options.map((option) => (
                            <div key={option.value} className="flex flex-row  space-x-2">
                                <Checkbox
                                    id={`${field.name}-${option.value}`}
                                    name={field.name}
                                    value={option.value}
                                    checked={checkboxValues.includes(option.value)}
                                    onCheckedChange={(checked) =>
                                        handleCheckboxChange(field.name, option.value, checked as boolean)
                                    }
                                    disabled={isView}
                                    className="text-blue-600 border-gray-400 data-[state=checked]:bg-blue-600"
                                />
                                <Label
                                    htmlFor={`${field.name}-${option.value}`}
                                    className="text-sm text-gray-300 cursor-pointer"
                                >
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                );

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
