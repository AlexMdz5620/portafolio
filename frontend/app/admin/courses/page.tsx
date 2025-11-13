'use client';

import { createCourse, deleteCourse, updateCourse } from '@/actions/courses';
import CrudFields from '@/components/CrudFields';
import { CrudDialog, useCrudDialog } from '@/components/dialog/CrudDialog';
import { Button } from '@/components/ui/button';
import { CourseWithId } from '@/schemas/courseSchema';
import { useAdminStore } from '@/store/adminStore';
import { ActionResponse } from '@/types/actions';
import { formatDateForDisplay, objectToFormData } from '@/utils';
import { PencilIcon, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

// Configuración de campos para cursos
const courseFields = [
    { name: 'title', label: 'Título', type: 'text' as const, required: true },
    { name: 'institute', label: 'Institución', type: 'text' as const, required: true },
    { name: 'description', label: 'Descripción', type: 'textarea' as const },
    { name: 'complete_date', label: 'Fecha de Finalización', type: 'date' as const, required: true },
    { name: 'img_url', label: 'Certificado', type: 'image' as const },
];

export default function CoursePage() {
    const { profile } = useAdminStore();
    const courses = (profile?.courses ?? []) as CourseWithId[];

    const { isOpen, operation, data, openCreate, openEdit, openDelete, close } = useCrudDialog({
        title: '',
        institute: '',
        img_url: '',
        description: '',
        complete_date: '',
    });

    // 🆕 Wrappers tipados
    const handleSubmit = async (formDataObj: Record<string, unknown>): Promise<ActionResponse> => {
        // 🆕 Validar que los datos coinciden con CourseFormData
        const formData = objectToFormData(formDataObj);

        if (operation === 'create') {
            return await createCourse({ success: false, msg: '', errors: [] }, formData);
        } else if (operation === 'edit' && data?.id) {
            return await updateCourse(data.id.toString(), { success: false, msg: '', errors: [] }, formData);
        }

        return { success: false, msg: 'Operación no válida', errors: ['Operación no reconocida'] };
    };

    const handleDelete = async (id: string): Promise<ActionResponse> => {
        return await deleteCourse(id);
    };

    return (
        <section
            className="w-full bg-linear-to-br from-[#3a3d40] to-[#181719]"
        >
            <div className='flex flex-col items-center justify-start pt-20 px-2 sm:px-8 md:px-16 lg:py-20 lg:px-18 min-h-screen'>
                <div>
                    <div className='flex justify-between items-center py-6'>
                        <h1 className="text-white font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-center">
                            Cursos
                        </h1>
                        <Button
                            size='lg'
                            variant='ghost'
                            className='cursor-pointer hover:bg-gray-700 hover:text-white duration-300 gap-2'
                            onClick={openCreate}
                        >
                            <Plus className="h-4 w-4" />

                            Nuevo Curso
                        </Button>
                    </div>
                    {courses.length > 0
                        ? <div className="py-2 align-middle sm:px-6 lg:px-8 bg-gray-900 text-white rounded-3xl">
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
                                        <tr key={c.id} >
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
                                                        onClick={() => openEdit(c)}
                                                    >
                                                        <PencilIcon className='h-5 w-5' />
                                                    </Button>
                                                    <Button
                                                        variant='destructive'
                                                        className='cursor-pointer hover:bg-gray-700 hover:text-white duration-300'
                                                        onClick={() => openDelete(c)}
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
                        : <div className="text-center py-12 align-middle sm:px-6 lg:px-8 bg-gray-900 text-white rounded-3xl w-2xl">
                            <h3 className="text-lg font-medium mb-2 pb-4">No se han encontrado cursos</h3>
                            <p className="text-muted-foreground mb-2">
                                Aún no hay cursos en tu portafolio.
                            </p>
                        </div>
                    }
                </div>
            </div>

            <CrudDialog
                operation={operation}
                isOpen={isOpen}
                onOpenChange={close}
                title={operation === 'create' ? 'Nuevo Curso' : 'Editar Curso'}
                description={operation === 'create'
                    ? 'Completa los datos para crear un nuevo curso'
                    : 'Modifica los datos del curso'
                }
                data={data}
                onSubmit={handleSubmit}
                onDelete={handleDelete}
                deleteConfirmationDescription={`Esta acción no se puede deshacer. Se eliminará el curso "${data?.title}" permanentemente.`}
            >
                {(operation, formData, setFormData) => (
                    <CrudFields
                        fields={courseFields}
                        formData={formData}
                        setFormData={setFormData}
                        folder="portafolio/courses"
                    />
                )}
            </CrudDialog>
        </section >
    );
}
