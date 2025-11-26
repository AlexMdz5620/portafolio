'use client';

import { createProject, deleteProject, updateProject } from '@/actions/project.action';
import CrudFields, { TypeFields } from '@/components/dialog/CrudFields';
import { CrudDialog, useCrudDialog } from '@/components/dialog/CrudDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStore } from '@/store/adminStore';
import { ActionResponse } from '@/types/actions';
import { objectToFormData } from '@/utils';
import { Eye, PencilIcon, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function PorjectPage() {
  const { projects, techs } = useAdminStore();
  const projectsFields: TypeFields = [
    {
      name: 'title',
      label: 'Nombre del Proyecto',
      type: 'text',
      placeholder: 'Ej: POS, Todo List, etc...',
      required: true
    },
    {
      name: 'img_url',
      label: 'Imagen del Proyecto',
      type: 'image',
      required: true
    },
    {
      name: 'github_url',
      label: 'Link del Repositorio',
      type: 'text',
      placeholder: 'Ej: https://github.com/nombre_de_usuario/nombre_del_proyecto',
      required: true
    },
    {
      name: 'demo_url',
      label: 'Link del Proyecto',
      type: 'text',
      placeholder: 'Ej: https://vercel.com/...',
      required: true
    },
    {
      name: 'type',
      label: 'Especialización',
      type: 'text',
      placeholder: 'Ej: Fronend, Backend, FullStack, etc...',
      required: true
    },
    {
      name: 'featured',
      label: '¿Es relevante? (Los relevantes irán a la página principal)',
      type: 'checkbox',
      required: false,
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      placeholder: 'En este proyecto trabaje en...',
      required: true
    },
    {
      name: 'techIds',
      label: 'Tecnologías usadas',
      type: 'checkbox',
      placeholder: 'Seleciona las tecnologías que usaste en el proyecto',
      required: true,
      multiple: true,
      options: techs?.map(t => {
        return {
          value: t.id.toString(),
          label: t.name
        }
      }),
    },
  ];

  const { isOpen, operation, data, openCreate, openView, openEdit, openDelete, close } = useCrudDialog({
    title: '',
    img_url: '',
    github_url: '',
    demo_url: '',
    type: '',
    featured: false,
    description: '',
    techIds: [],
  });

  const handleSubmit = async (formDataObj: Record<string, unknown>): Promise<ActionResponse> => {
    const formData = objectToFormData(formDataObj);

    if (operation === 'create') {
      return await createProject({ success: false, msg: '', errors: [] }, formData);
    } else if (operation === 'edit' && data?.id) {
      return await updateProject(data.id, { success: false, msg: '', errors: [] }, formData);
    }

    return { success: false, msg: 'Operación no válida', errors: ['Operación no reconocida'] };
  };

  const handleDelete = async (data: {id: number, password: string}): Promise<ActionResponse> => {
    return await deleteProject(data.id, data.password);
  }

  return (
    <section
      className="w-full bg-linear-to-br from-[#3a3d40] to-[#181719]"
    >
      <div className='flex flex-col items-center justify-start pt-20 px-2 sm:px-8 md:px-16 lg:py-20 lg:px-18 min-h-screen'>
        <div>
          <div className='flex justify-between items-center py-6'>
            <h1 className="text-white font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-center">
              Proyectos
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
            {projects && projects.length > 0
              ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-9">
                {projects.map(pro => (
                  <Card
                    key={pro.id}
                    className="w-full hover:shadow-lg transition-shadow duration-200 flex flex-col bg-[#121212] border border-white/10 rounded-xl text-white"
                  >
                    {/* HEADER */}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold wrap-break-word max-w-[70%]">
                        {pro.title}
                      </CardTitle>
                      {/* Tipo */}
                      <div className='flex justify-between'>
                        <p className="text-sm leading-relaxed opacity-90 wrap-break-word">
                          {pro.type}
                        </p>
                        <p className={`text-sm opacity-75 ${pro.featured ? 'text-green-500' : 'text-amber-500'}`}>
                          {pro.featured ? 'Relevante' : 'No tan relevante'}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 pt-0 space-y-6">
                      {/* Link Demo */}
                      <div>
                        <span className='font-bold'>Link del Proyecto</span>
                        <p className="text-sm leading-relaxed opacity-90 wrap-break-word">
                          {pro.demo_url}
                        </p>
                      </div>
                      {/* Link GitHub */}
                      <div>
                        <span className='font-bold'>Link del Repositorio</span>
                        <p className="text-sm leading-relaxed opacity-90 wrap-break-word">
                          {pro.github_url}
                        </p>
                      </div>
                      {/* Descripción */}
                      <div>
                        <span className='font-bold'>Descripción</span>
                        {pro.description
                          ? <p className="text-sm leading-relaxed opacity-90 wrap-break-word">
                            {(() => {
                              const maxWords = 20;
                              const maxChars = 80;
                              let desc = pro.description;
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
                      </div>
                      {/* Imagen */}
                      <div className="mt-3">
                        {pro.img_url ? (
                          <Image
                            src={pro.img_url}
                            alt={`Certificado de ${pro.title}`}
                            width={300}
                            height={200}
                            className="rounded-lg border border-white/10 object-cover w-full h-auto"
                          />
                        ) : (
                          <p className="text-sm opacity-60 italic">
                            Sin imagen del proyecto
                          </p>
                        )}
                      </div>
                      {/* Tech */}
                      <div className='mt-3'>
                        {pro.techs
                          ? <ul className='space-y-3'>
                            {pro.techs.map((tech) => (
                              <li
                                key={tech.id}
                                className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                              >
                                {tech.name}
                              </li>
                            ))}
                          </ul>
                          : <p className="text-sm opacity-60 italic">
                            Sin tecnologías asignadas
                          </p>
                        }
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-3 border-t border-white/10 pt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openView(pro)}
                        className="hover:scale-105 transition-transform"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(pro)}
                        className="hover:scale-105 transition-transform"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openDelete(pro)}
                        className="hover:scale-105 transition-transform text-red-600 hover:text-white hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
                )}
              </div>
              : <div className="text-center py-12 sm:px-6 lg:px-8 bg-gray-900 text-white rounded-3xl">
                <h3 className="text-lg font-medium mb-2 pb-4">
                  No se han encontrado proyectos
                </h3>
                <p className="text-muted-foreground mb-2">
                  Aún no hay proyectos en tu portafolio.
                </p>
              </div>
            }
          </div>
        </div>
      </div>

      <CrudDialog
        operation={operation}
        isOpen={isOpen}
        onOpenChange={close}
        title={operation === 'create'
          ? 'Nuevo Proyecto'
          : operation === 'edit'
            ? 'Editar Proyecto'
            : 'Información del Proyecto'
        }
        description={operation === 'create'
          ? 'Completa los datos para crear un nuevo proyecto'
          : operation === 'edit'
            ? 'Modifica los datos del proyecto'
            : 'Información del Proyecto'
        }
        data={data}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        deleteConfirmationDescription={`Esta acción no se puede deshacer. Se eliminará el proyecto "${data?.title}" permanentemente.`}
      >
        {(operation, formData, setFormData) => (
          <CrudFields
            fields={projectsFields}
            formData={formData}
            setFormData={setFormData}
            folder='portafolio/projects'
            operation={operation}
          />
        )}
      </CrudDialog>
    </section>
  );
}
