'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploadProps {
    onImageUpload?: (url: string) => void;
    existingImageUrl?: string;
    folder?: string;
    operation: "create" | "edit" | "delete" | "view"
}

export default function ImageUpload({
    onImageUpload,
    existingImageUrl,
    folder = 'portafolio',
    operation
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(existingImageUrl || '');
    const [error, setError] = useState('');

    const uploadToCloudinary = async (file: File) => {
        // 🆕 Verificar que las variables de entorno estén disponibles
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
        const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            throw new Error('Configuración de Cloudinary no encontrada');
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        const uploadFolder = folder || 'portafolio';
        formData.append('folder', uploadFolder.replace(/^\//, ''));

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Error al subir la imagen');
            }

            const data = await response.json();
            return data.secure_url;
        } catch (error) {
            console.error(error);
            throw new Error('Error al subir la imagen a Cloudinary');
        }
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setUploading(true);
        setError('');

        try {
            const url = await uploadToCloudinary(file);
            setImageUrl(url);
            if (onImageUpload) {
                onImageUpload(url);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setUploading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        maxFiles: 1,
        multiple: false
    });

    const removeImage = () => {
        setImageUrl('');
        if (onImageUpload) {
            onImageUpload('');
        }
    };

    return (
        <div className="space-y-4">
            {imageUrl ? (
                <div className="relative inline-block">
                    <Image
                        src={imageUrl}
                        alt="Preview"
                        className="h-32 w-auto object-cover rounded-md border"
                        width={120}
                        height={120}
                    />
                    {operation !== 'view' && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full cursor-pointer"
                            onClick={removeImage}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                        } ${uploading ? 'opacity-50' : ''}`}
                >
                    <input {...getInputProps()} />
                    {uploading ? (
                        <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
                    ) : (
                        <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
                    )}
                    <p className="mt-2 text-sm text-gray-600">
                        {uploading
                            ? 'Subiendo imagen...'
                            : isDragActive
                                ? 'Suelta la imagen aquí...'
                                : 'Arrastra y suelta una imagen, o haz clic para seleccionar'
                        }
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF, WEBP hasta 5MB
                    </p>
                </div>
            )}

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}