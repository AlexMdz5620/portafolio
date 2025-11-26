"use client";

import { createLink, deleteLink, updateLink } from '@/actions/link.action';
import CrudFields, { TypeFields } from '@/components/dialog/CrudFields';
import { CrudDialog, useCrudDialog } from '@/components/dialog/CrudDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdminStore } from '@/store/adminStore';
import { ActionResponse } from '@/types/actions';
import { objectToFormData } from '@/utils';
import { Edit, Plus, Trash2 } from 'lucide-react';

export default function LinksPage() {
  const { links } = useAdminStore();
  const linkFields: TypeFields = [
    { name: 'name', label: 'Red Social', type: 'text' as const, required: true, placeholder: 'Ej: GitHub...' },
    { name: 'link', label: 'Link', type: 'text' as const, required: true, placeholder: 'Ej: ejemplo.com...' },
    {
      name: 'active',
      label: 'Activo',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'true', label: 'Activo' },
        { value: 'false', label: 'Inactivo' },
      ]
    }
  ];

  const { isOpen, operation, data, openCreate, openEdit, openDelete, close } = useCrudDialog({
    name: '',
    link: '',
    active: false,
  });

  const handleSubmite = async (formDataObj: Record<string, unknown>): Promise<ActionResponse> => {
    const formData = objectToFormData(formDataObj);

    if (operation === 'create') {
      return await createLink({ success: false, msg: '', errors: [] }, formData);
    } else if (operation === 'edit' && data?.id) {
      return await updateLink(data.id, { success: false, msg: '', errors: [] }, formData);
    }

    return { success: false, msg: 'Operación no válida', errors: ['Operación no reconocida.'] }
  }

  const handleDelete = async (data: {id: number, password: string}): Promise<ActionResponse> => {
    return await deleteLink(data.id, data.password);
  }

  return (
    <section
      className="w-full bg-linear-to-br from-[#3a3d40] to-[#181719]"
    >
      <div className='flex flex-col items-center justify-start pt-20 px-2 sm:px-8 md:px-16 lg:py-20 lg:px-18 min-h-screen'>
        <div>
          <div className='flex justify-between items-center py-6'>
            <h1 className="text-white font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-center">
              Redes Sociales
            </h1>
            <Button
              size='lg'
              variant='ghost'
              className='cursor-pointer hover:bg-gray-700 hover:text-white duration-300 gap-2'
              onClick={openCreate}
            >
              <Plus className='h-4 w-4' />
              Nueva Red Social
            </Button>
          </div>
          {links && links.length > 0
            ? <div className='py-6 align-middle sm:px-6 lg:px-8 bg-gray-900 text-white rounded-3xl space-y-6 hidden md:block'>
              <div className='space-y-6'>
                <p>
                  Aquí se administran las redes sociales que se mostrarán en tu portafolio
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-9">
                  {links.map(link => (
                    <Card
                      key={link.id}
                      className="w-full hover:shadow-lg transition-shadow duration-200 flex flex-col bg-[#121212] border border-white/10 rounded-xl text-white"
                    >
                      {/* HEADER */}
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-semibold wrap-break-word max-w-[70%]">
                            {link.name}
                          </CardTitle>

                          <Badge
                            variant={link.active ? "default" : "secondary"}
                            className={
                              link.active
                                ? "bg-green-600 text-white"
                                : "bg-gray-600/70 text-white"
                            }
                          >
                            {link.active ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                      </CardHeader>

                      {/* CONTENT */}
                      <CardContent className="flex-1 pt-0">
                        <p className="text-sm wrap-break-word leading-relaxed opacity-90">
                          {link.link}
                        </p>
                      </CardContent>

                      {/* FOOTER */}
                      <CardFooter className="flex justify-end gap-3 border-t border-white/10 pt-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(link)}
                          className="hover:scale-105 transition-transform"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDelete(link)}
                          className="hover:scale-105 transition-transform text-red-600 hover:text-white hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            : <div className="text-center py-12 align-middle sm:px-6 lg:px-8 bg-gray-900 text-white rounded-3xl w-2xl">
              <h3 className="text-lg font-medium mb-2 pb-4">No se han encontrado redes sociales</h3>
              <p className="text-muted-foreground mb-2">
                Aún no hay redes sociales en tu portafolio.
              </p>
            </div>
          }
        </div>
      </div>

      <CrudDialog
        operation={operation}
        isOpen={isOpen}
        onOpenChange={close}
        title={
          operation === 'create'
            ? 'Nueva Red Social'
            : 'Editar Red Social'
        }
        description={
          operation === 'create'
            ? 'Completa los datos para crear una nueva red social'
            : 'Modifica los datos de la red social'
        }
        data={data}
        onSubmit={handleSubmite}
        onDelete={handleDelete}
        deleteConfirmationDescription={`Esta acción no se puede deshacer. Se eliminará la red social "${data?.name}" permanentemente.`}
      >
        {(operation, formData, setFormData) => (
          <CrudFields
            fields={linkFields}
            formData={formData}
            operation={operation}
            setFormData={setFormData}
          />
        )}
      </CrudDialog>
    </section>
  )
}
