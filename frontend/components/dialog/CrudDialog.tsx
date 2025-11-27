"use client";

import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Tech } from '@/schemas/techSchema';

export type CrudOperation = 'create' | 'edit' | 'delete' | 'view';

// Tipo para los datos que incluyen ID
export interface WithId { id: number };

// Tipo para los datos del formulario
export type FormData = Record<string, unknown>

export interface CrudDialogProps {
    // Configuración básica
    operation: CrudOperation
    title: string
    description?: string
    defaultValues?: Record<string, unknown>

    // Datos y estado
    data?: Record<string, unknown> & Partial<WithId>
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void

    // Operaciones
    onSubmit: (formData: FormData) => Promise<{ success: boolean; msg: string; errors: string[] }>
    onDelete?: (id: number) => Promise<{ success: boolean; msg: string; errors: string[] }>

    // Renderizado
    trigger?: React.ReactNode
    children: (operation: CrudOperation, formData: FormData, setFormData: (data: FormData) => void) => React.ReactNode

    // Configuración adicional
    deleteConfirmationTitle?: string
    deleteConfirmationDescription?: string
    submitButtonText?: string
    cancelButtonText?: string
    deleteButtonText?: string

    // Estados de carga
    isLoading?: boolean
    isSubmitting?: boolean
    isDeleting?: boolean

    // Callbacks
    onSuccess?: () => void
    onError?: (error: unknown) => void
}

export function CrudDialog({
    operation,
    title,
    description,
    defaultValues,
    data,
    isOpen,
    onOpenChange,
    onSubmit,
    onDelete,
    trigger,
    children,
    deleteConfirmationTitle = '¿Estás seguro?',
    deleteConfirmationDescription = `Esta acción no se puede deshacer.`,
    submitButtonText,
    cancelButtonText = 'Cancelar',
    deleteButtonText = 'Eliminar',
    isLoading = false,
    isSubmitting = false,
    isDeleting = false,
    onSuccess,
    onError
}: CrudDialogProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({});
    const [errors, setErrors] = useState<string[]>([]);

    const isControlled = isOpen !== undefined;
    const dialogOpen = isControlled ? isOpen : open;
    const setDialogOpen = isControlled ? onOpenChange : setOpen;

    // Actualizar valores del formulario cuando cambian los datos
    useEffect(() => {
        if ((operation === 'view' || operation === 'edit') && data) {
            setFormData(data);
        } else if (operation === 'create') {
            setFormData(defaultValues || {});
        }
    }, [data, operation, defaultValues]);

    // Resetear formularios cuando se cierra el diálogo
    useEffect(() => {
        if (!dialogOpen) {
            setFormData(defaultValues || {});
            setErrors([])
        }
    }, [dialogOpen, defaultValues]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);

        try {
            const result = await onSubmit(formData);

            if (result.success) {
                toast.success('Éxito', {
                    description: result.msg || `Operación completada correctamente`,
                });
                setDialogOpen?.(false);
                setFormData(defaultValues || {});
                onSuccess?.();
            } else {
                setErrors(result.errors);
                toast.error('Error', {
                    description: result.msg || `Ocurrió un error`
                });
            }
        } catch (error) {
            toast.error('Error', {
                description: `Ocurrió un error al ${operation === 'create' ? 'crear' : 'actualizar'}`,
            });
            onError?.(error)
        }
    }

    const handleDelete = async () => {
        if (!onDelete || !data || !data.id) return;

        try {
            const result = await onDelete(data.id);

            if (result.success) {
                toast.success('Éxito', {
                    description: result.msg || 'Eliminado correctamente'
                })
                setDialogOpen?.(false)
                onSuccess?.()
            } else {
                toast.error('Error', {
                    description: result.msg || 'Ocurrió un error al eliminar'
                })
            }
        } catch (error) {
            toast.error('Error', {
                description: 'Ocurrió un error al eliminar'
            });
            onError?.(error)
        }
    }

    const getSubmitButtonText = () => {
        if (submitButtonText) return submitButtonText;
        switch (operation) {
            case 'create': return 'Crear';
            case 'edit': return 'Actualizar';
            default: return 'Guardar'
        }
    };

    const getIcon = () => {
        switch (operation) {
            case 'create': return <Plus className="h-4 w-4" />
            case 'edit': return <Pencil className="h-4 w-4" />
            case 'delete': return <Trash2 className="h-4 w-4" />
            default: return null
        }
    }

    const isSubmittingState = isSubmitting || isLoading;

    if (operation === 'delete') {
        return (
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                {trigger && (
                    <AlertDialogTrigger>
                        {trigger}
                    </AlertDialogTrigger>
                )}
                <AlertDialogContent className='bg-gray-900 border-0 text-white'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {deleteConfirmationTitle}
                        </AlertDialogTitle>
                        <AlertDialogDescription className='text-gray-300'>
                            {deleteConfirmationDescription}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700">
                            {cancelButtonText}
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700 min-w-[100px] hover:cursor-pointer"
                        >
                            {isDeleting ? 'Eliminando...' : deleteButtonText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            {trigger && (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            )}
            <DialogContent
                className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-gray-900 border-0 text-white'
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {getIcon()}
                        {title}
                    </DialogTitle>
                    {description && (
                        <DialogDescription className='text-gray-300'>
                            {description}
                        </DialogDescription>
                    )}
                </DialogHeader>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-4'>
                        {children(operation, formData, setFormData)}
                    </div>

                    {errors.length > 0 && (
                        <div className="bg-red-900/50 border border-red-700 rounded p-3">
                            <p className="text-red-300 text-sm font-medium">Errores de validación:</p>
                            <ul className="text-red-200 text-sm list-disc list-inside mt-1">
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type='button'
                            variant='outline'
                            onClick={() => setDialogOpen?.(false)}
                            disabled={isSubmittingState}
                            className="bg-gray-800 text-white hover:bg-gray-700"
                        >
                            {cancelButtonText}
                        </Button>
                        {operation !== 'view' &&
                            <Button
                                type="submit"
                                disabled={isSubmittingState}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {isSubmittingState ? 'Guardando...' : getSubmitButtonText()}
                            </Button>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
};

// Hook personalizado para facilitar el uso del CrudDialog (MODIFICADO)
export function useCrudDialog(defaultValues?: Record<string, unknown>) {
    const [isOpen, setIsOpen] = useState(false);
    const [operation, setOperation] = useState<CrudOperation>('create');
    const [data, setData] = useState<(Record<string, unknown> & Partial<WithId>) | undefined>()

    const openCreate = () => {
        setOperation('create');
        setData(undefined);
        setIsOpen(true);
    }
    const openEdit = (itemData: Record<string, unknown> & Partial<WithId>) => {
        setOperation('edit');

        const transformedData = {
            ...itemData,
            // Si viene techs (array de objetos), convertirlo a techIds (array de strings)
            techIds: itemData.techs && Array.isArray(itemData.techs) ?
                itemData.techs.map((tech: Tech) => tech.id.toString()) :
                itemData.techIds || []
        };

        setData(transformedData);
        setIsOpen(true);
    }
    const openView = (itemData: Record<string, unknown> & Partial<WithId>) => {
        setOperation('view')
        setData(itemData)
        setIsOpen(true)
    }
    const openDelete = (itemData: Record<string, unknown> & Partial<WithId>) => {
        setOperation('delete');
        setData(itemData);
        setIsOpen(true);
    }

    const close = () => {
        setIsOpen(false);
        setData(undefined);
    }

    return {
        isOpen,
        operation,
        data,
        openCreate,
        openEdit,
        openView,
        openDelete,
        close,
        defaultValues,
        setData
    }
}