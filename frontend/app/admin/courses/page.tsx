'use client';

import { createCourse, deleteCourse, updateCourse } from '@/actions/courses';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CourseWithId } from '@/schemas/courseSchema';
import { useAdminStore } from '@/store/adminStore';
import { formatDateForDisplay, formatDateForInput } from '@/utils';
import { PencilIcon, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function CoursePage() {
    const { profile } = useAdminStore();
    const courses = (profile?.courses ?? []) as CourseWithId[];

    // 🆕 Estados para controlar los diálogos
    const [openDialog, setOpenDialog] = useState<'create' | 'edit' | 'delete' | false>(false);
    const [selectedCourse, setSelectedCourse] = useState<CourseWithId | null>(null);
    // 🆕 Estado para la imagen
    const [imageUrl, setImageUrl] = useState('');

    // 🆕 Estados para las acciones
    const [createState, createDispatch] = useActionState(createCourse, {
        success: false,
        msg: '',
        errors: [],
        shouldReload: false,
    });

    let updateCourseWhitId;
    if (selectedCourse && selectedCourse.id) {
        updateCourseWhitId = updateCourse.bind(null, selectedCourse.id)
    }
    const [updateState, updateDispatch] = useActionState(updateCourseWhitId!, {
        success: false,
        msg: '',
        errors: [],
        shouldReload: false,
    });

    let deleteCourseWhitId;
    if (selectedCourse && selectedCourse.id) {
        deleteCourseWhitId = deleteCourse.bind(null, selectedCourse.id);
    }

    const [deleteState, deleteDispatch] = useActionState(deleteCourseWhitId!, {
        success: false,
        msg: '',
        errors: [],
        shouldReload: false,
    });

    // 🆕 Efecto para manejar resultados de las acciones
    useEffect(() => {
        if (createState.success) {
            toast.success(createState.msg || 'Curso creado correctamente');
            setOpenDialog(false);
            // Aquí podrías recargar los datos o actualizar el store
        }
        if (updateState.success) {
            toast.success(updateState.msg || 'Curso actualizado correctamente');
            setOpenDialog(false);
            // Actualizar el store
        }
        if (deleteState.success) {
            toast.success(deleteState.msg || 'Curso eliminado correctamente');
            setOpenDialog(false);
        }
    }, [createState, updateState, deleteState]);

    // 🆕 Efecto para resetear la imagen cuando se abra el diálogo de creación
    useEffect(() => {
        if (openDialog === 'create') {
            setImageUrl('');
        } else if (openDialog === 'edit' && selectedCourse) {
            setImageUrl(selectedCourse.img_url || '');
        }
    }, [openDialog, selectedCourse]);


    // 🆕 Función para abrir diálogo de creación
    const openCreateDialog = () => {
        setSelectedCourse(null);
        setOpenDialog('create');
    };

    // 🆕 Función para abrir diálogo de edición
    const openEditDialog = (course: CourseWithId) => {
        setSelectedCourse(course);
        setOpenDialog('edit');
    };

    // 🆕 Función para abrir diálogo de eliminación
    const openDeleteDialog = (course: CourseWithId) => {
        setSelectedCourse(course);
        setOpenDialog('delete');
    };

    // 🆕 Función para cerrar diálogos
    const closeDialog = () => {
        setOpenDialog(false);
        setSelectedCourse(null);
    };

    // 🆕 Función para manejar la subida de imagen
    const handleImageUpload = (url: string) => {
        setImageUrl(url);
    };

    return (
        <section
            className="w-full bg-linear-to-br from-[#3a3d40] to-[#181719]"
        >
            <div className='flex flex-col items-center justify-start pt-20 px-2 sm:px-8 md:px-16 lg:py-20 lg:px-18 min-h-screen'>
                <div className=''>
                    <div className='flex justify-between items-center'>
                        <h1 className="text-white font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-center mb-6">
                            Cursos
                        </h1>
                        <Button
                            variant='ghost'
                            className='cursor-pointer hover:bg-gray-700 hover:text-white duration-300'
                            onClick={openCreateDialog}
                        >
                            Nuevo Curso
                        </Button>
                    </div>
                    <div className="py-2 align-middle sm:px-6 lg:px-8 bg-gray-900 text-white rounded-3xl">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className="py-3.5 pl-4 pr-3 text-sm font-semibold sm:pl-0"
                                    >Titulo</th>
                                    <th
                                        scope='col'
                                        className="py-3.5 pl-4 pr-3 text-sm font-semibold sm:pl-0"
                                    >Descripción</th>
                                    <th
                                        scope='col'
                                        className="py-3.5 pl-4 pr-3 text-sm font-semibold sm:pl-0"
                                    >Institución</th>
                                    <th
                                        scope='col'
                                        className="py-3.5 pl-4 pr-3 text-sm font-semibold sm:pl-0"
                                    >Certificado</th>
                                    <th
                                        scope='col'
                                        className="py-3.5 pl-4 pr-3 text-sm font-semibold sm:pl-0"
                                    >Fecha de Finalización</th>
                                    <th
                                        scope='col'
                                        className="py-3.5 pl-4 pr-3 text-sm font-semibold sm:pl-0"
                                    >Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {courses.map(c => (
                                    <tr
                                        key={c.id}
                                    >
                                        <td className="py-4 pl-4 pr-3 text-sm font-medium sm:pl-0">{c.title}</td>
                                        <td className="px-3 py-4 text-sm text-gray-500">{c.description}</td>
                                        <td className="px-3 py-4 text-sm text-gray-500">{c.institute}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {c.img_url
                                                ? <Image
                                                    src={c.img_url}
                                                    alt={`Imágen del certificado de ${c.title}`}
                                                    width={120}
                                                    height={120}
                                                    priority
                                                />
                                                : "Imagen no disponible."
                                            }
                                        </td>
                                        <td className="px-3 py-4 text-sm text-gray-500">
                                            {c.complete_date
                                                ? formatDateForDisplay(c.complete_date)
                                                : "En curso"
                                            }
                                        </td>
                                        <td>
                                            <div className='flex gap-5 justify-end items-center'>
                                                <Button
                                                    variant='ghost'
                                                    className='cursor-pointer hover:bg-gray-700 hover:text-white duration-300'
                                                    onClick={() => openEditDialog(c)}
                                                >
                                                    <PencilIcon className='h-5 w-5' />
                                                </Button>
                                                <Button
                                                    variant='destructive'
                                                    className='cursor-pointer hover:bg-gray-700 hover:text-white duration-300'
                                                    onClick={() => openDeleteDialog(c)}
                                                >
                                                    <Trash2 className='h-5 w-5' />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 🆕 Diálogo para Crear/Editar */}
            <Dialog open={openDialog === 'create' || openDialog === 'edit'} onOpenChange={closeDialog}>
                <DialogContent className="sm:max-w-[600px] bg-gray-900 border-0 text-white">
                    <DialogHeader>
                        <DialogTitle>
                            {openDialog === 'create' ? 'Nuevo Curso' : 'Editar Curso'}
                        </DialogTitle>
                        <DialogDescription className="text-gray-300">
                            {openDialog === 'create'
                                ? 'Completa los datos para crear un nuevo curso.'
                                : 'Modifica los datos del curso.'}
                        </DialogDescription>
                    </DialogHeader>

                    <form
                        action={openDialog === 'create' ? createDispatch : updateDispatch}
                        className="space-y-4"
                    >
                        {/* Campo oculto para el ID en edición */}
                        {/*openDialog === 'edit' && selectedCourse && (
                            <input type="hidden" name="id" value={selectedCourse.id} />
                        )*/}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Título */}
                            <div className="md:col-span-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                                    Título *
                                </label>
                                <Input
                                    type="text"
                                    id="title"
                                    name="title"
                                    defaultValue={selectedCourse?.title || ''}
                                    required
                                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                                />
                                {/* 🆕 Mostrar errores específicos para título */}
                                {createState.errors?.map((error, index) =>
                                    error.toLowerCase().includes('título') && (
                                        <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
                                    )
                                )}
                                {updateState.errors?.map((error, index) =>
                                    error.toLowerCase().includes('título') && (
                                        <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
                                    )
                                )}
                            </div>

                            {/* Institución */}
                            <div>
                                <label htmlFor="institute" className="block text-sm font-medium text-gray-300">
                                    Institución *
                                </label>
                                <Input
                                    type="text"
                                    id="institute"
                                    name="institute"
                                    defaultValue={selectedCourse?.institute || ''}
                                    required
                                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                                />
                                {createState.errors?.map((error, index) =>
                                    error.toLowerCase().includes('institución') && (
                                        <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
                                    )
                                )}
                                {updateState.errors?.map((error, index) =>
                                    error.toLowerCase().includes('institución') && (
                                        <p key={index} className="text-red-500 text-sm mt-1">{error}</p>
                                    )
                                )}
                            </div>

                            {/* Fecha de Finalización */}
                            <div>
                                <label htmlFor="complete_date" className="block text-sm font-medium text-gray-300">
                                    Fecha de Finalización *
                                </label>
                                <Input
                                    type="date"
                                    id="complete_date"
                                    name="complete_date"
                                    required
                                    defaultValue={selectedCourse?.complete_date ? formatDateForInput(selectedCourse.complete_date) : ''}
                                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                                />
                            </div>

                            {/* 🆕 CAMPO PARA LA IMAGEN */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    Certificado (Imagen)
                                </label>
                                <ImageUpload
                                    onImageUpload={handleImageUpload}
                                    existingImageUrl={imageUrl}
                                    folder="portafolio/courses"
                                />
                                {/* Campo oculto para enviar la URL de la imagen */}
                                <input type="hidden" name="img_url" value={imageUrl} />
                            </div>

                            {/* Descripción */}
                            <div className="md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                                    Descripción
                                </label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    defaultValue={selectedCourse?.description || ''}
                                    rows={3}
                                    className="mt-1 bg-gray-800 border-gray-700 text-white"
                                />
                            </div>
                        </div>

                        {/* 🆕 Mostrar errores generales */}
                        {(createState.errors?.length > 0 || updateState.errors?.length > 0) && (
                            <div className="bg-red-900/50 border border-red-700 rounded p-3">
                                <p className="text-red-300 text-sm font-medium">Errores de validación:</p>
                                <ul className="text-red-200 text-sm list-disc list-inside mt-1">
                                    {createState.errors?.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                    {updateState.errors?.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={closeDialog}
                                className='cursor-pointer hover:bg-gray-700 hover:text-white duration-300'
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="ghost"
                                className='cursor-pointer hover:bg-gray-700 hover:text-white duration-300'
                            >
                                {openDialog === 'create' ? 'Crear' : 'Actualizar'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* 🆕 Diálogo para Eliminar */}
            <Dialog open={openDialog === 'delete'} onOpenChange={closeDialog}>
                <DialogContent className="sm:max-w-[400px] bg-gray-900 border-0 text-white">
                    <DialogHeader>
                        <DialogTitle>¿Estás seguro?</DialogTitle>
                        <DialogDescription className="text-gray-300">
                            Esta acción no se puede deshacer. Se eliminará el curso &quot;{selectedCourse?.title}&ldquo; permanentemente.
                        </DialogDescription>
                    </DialogHeader>
                    <form action={deleteDispatch}>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={closeDialog}
                                className='cursor-pointer hover:bg-gray-700 hover:text-white duration-300'
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                className='cursor-pointer hover:bg-gray-700 hover:text-white duration-300'
                            >
                                Eliminar
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </section>
    );
}
