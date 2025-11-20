'use client';

import { createCourse, deleteCourse, updateCourse } from '@/actions/courses.action';
import CrudFields, { TypeFields } from '@/components/CrudFields';
import { CrudDialog, useCrudDialog } from '@/components/dialog/CrudDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Courses } from '@/schemas/courseSchema';
import { useAdminStore } from '@/store/adminStore';
import { ActionResponse } from '@/types/actions';
import { formatDateForDisplay, objectToFormData } from '@/utils';
import { Eye, PencilIcon, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

// Configuración de campos para cursos
const courseFields: TypeFields = [
    { name: 'title', label: 'Título', type: 'text' as const, required: true },
    { name: 'institute', label: 'Institución', type: 'text' as const, required: true },
    { name: 'description', label: 'Descripción', type: 'textarea' as const },
    { name: 'complete_date', label: 'Fecha de Finalización', type: 'date' as const, required: true },
    { name: 'img_url', label: 'Certificado', type: 'image' as const },
];

export default function CoursePage() {
    const { profile } = useAdminStore();
    const courses = (profile?.courses ?? []) as Courses;

    const { isOpen, operation, data, openCreate, openView, openEdit, openDelete, close } = useCrudDialog({
        title: '',
        institute: '',
        img_url: '',
        description: '',
        complete_date: '',
    });

    // Wrappers tipados
    const handleSubmit = async (formDataObj: Record<string, unknown>): Promise<ActionResponse> => {
        // Validar que los datos coinciden con CourseFormData
        const formData = objectToFormData(formDataObj);

        if (operation === 'create') {
            return await createCourse({ success: false, msg: '', errors: [] }, formData);
        } else if (operation === 'edit' && data?.id) {
            return await updateCourse(data.id, { success: false, msg: '', errors: [] }, formData);
        }

        return { success: false, msg: 'Operación no válida', errors: ['Operación no reconocida'] };
    };

    const handleDelete = async (id: number): Promise<ActionResponse> => {
        return await deleteCourse(id.toString());
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
                    <div className="py-6 align-middle sm:px-6 lg:px-8 bg-gray-900 text-white rounded-3xl space-y-6 hidden md:block">
                        {courses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-9">
                                {courses.map((c) => (
                                    <Card
                                        key={c.id}
                                        className="w-full hover:shadow-lg transition-shadow duration-200 flex flex-col bg-[#121212] border border-white/10 rounded-xl text-white"
                                    >
                                        {/* HEADER */}
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-lg font-semibold wrap-break-word max-w-[70%]">
                                                {c.title}
                                            </CardTitle>
                                            <p className="text-sm opacity-75">{c.institute}</p>
                                        </CardHeader>

                                        {/* CONTENT */}
                                        <CardContent className="flex-1 pt-0">
                                            {/* Descripción */}
                                            {c.description ?
                                                <p className="text-sm leading-relaxed opacity-90 wrap-break-word">
                                                    {(() => {
                                                        const maxWords = 20;
                                                        const maxChars = 80;
                                                        let desc = c.description;
                                                        // Limita palabras
                                                        const words = desc.split(" ");
                                                        if (words.length > maxWords) {
                                                            desc = words.slice(0, maxWords).join(" ");
                                                        }
                                                        // Limita caracteres
                                                        if (desc.length > maxChars) {
                                                            desc = desc.slice(0, maxChars) + "...";
                                                        }
                                                        return desc.endsWith(".") ? desc : desc + ".";
                                                    })()}
                                                </p>
                                                : <p className='text-sm leading-relaxed opacity-90 wrap-break-word'>Sin descripción</p>
                                            }

                                            {/* Imagen */}
                                            <div className="mt-3">
                                                {c.img_url ? (
                                                    <Image
                                                        src={c.img_url}
                                                        alt={`Certificado de ${c.title}`}
                                                        width={300}
                                                        height={200}
                                                        className="rounded-lg border border-white/10 object-cover w-full h-auto"
                                                    />
                                                ) : (
                                                    <p className="text-sm opacity-60 italic">
                                                        Sin imagen de certificado
                                                    </p>
                                                )}
                                            </div>

                                            {/* Fecha */}
                                            <div className="text-sm opacity-80 pt-1">
                                                <span className="font-semibold">Finalizado:</span>{" "}
                                                {c.complete_date
                                                    ? formatDateForDisplay(c.complete_date)
                                                    : "En curso"}
                                            </div>
                                        </CardContent>

                                        {/* FOOTER */}
                                        <CardFooter className="flex justify-end gap-3 border-t border-white/10 pt-3">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openView(c)}
                                                className="hover:scale-105 transition-transform"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEdit(c)}
                                                className="hover:scale-105 transition-transform"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openDelete(c)}
                                                className="hover:scale-105 transition-transform text-red-600 hover:text-white hover:bg-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}

                            </div>
                        ) : (
                            <div className="text-center py-12 sm:px-6 lg:px-8 bg-gray-900 text-white rounded-3xl">
                                <h3 className="text-lg font-medium mb-2 pb-4">
                                    No se han encontrado cursos
                                </h3>
                                <p className="text-muted-foreground mb-2">
                                    Aún no hay cursos en tu portafolio.
                                </p>
                            </div>
                        )}
                    </div>
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
                        operation={operation}
                    />
                )}
            </CrudDialog>
        </section >
    );
}
