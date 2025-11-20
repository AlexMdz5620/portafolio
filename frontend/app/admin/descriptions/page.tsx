"use client";

import { createDescription, deleteDescription, updateDescription } from '@/actions/description.action';
import CrudFields from '@/components/CrudFields';
import DescrCard from '@/components/description/DescrCard';
import { CrudDialog, useCrudDialog } from '@/components/dialog/CrudDialog';
import { Button } from '@/components/ui/button';
import { useAdminStore } from '@/store/adminStore';
import { ActionResponse } from '@/types/actions';
import { objectToFormData } from '@/utils';
import { Plus } from 'lucide-react';


export default function DescriptionPage() {
  const { descriptions } = useAdminStore();
  const descriptionFields = [
    { name: 'name', label: 'Título', type: 'text' as const, required: true },
    { name: 'content', label: 'Descripción', type: 'textarea' as const, required: true },
    {
      name: 'type',
      label: 'Tipo de Descripción',
      type: 'radio' as const,
      options: [
        { value: 'main', label: 'Página de Inicio' },
        { value: 'about', label: 'Página "Sobre Mi"' },
      ]
    },
  ];

  const { isOpen, operation, data, openCreate, openEdit, openDelete, openView, close } = useCrudDialog({
    name: '',
    content: '',
    type: 'about',
  });

  const handleSubmit = async (formDataObj: Record<string, unknown>): Promise<ActionResponse> => {
    const formData = objectToFormData(formDataObj);

    if (operation === 'create') {
      return await createDescription({ success: false, msg: '', errors: [] }, formData);
    } else if (operation === 'edit' && data?.id) {
      return await updateDescription(data.id.toString(), { success: false, msg: '', errors: [] }, formData);
    }

    return { success: false, msg: 'Operación no válida', errors: ['Operación no reconocida'] };
  };

  const handleDelete = async (id: number): Promise<ActionResponse> => {
    return await deleteDescription(id.toString());
  }

  return (
    <section
      className="w-full bg-linear-to-br from-[#3a3d40] to-[#181719]"
    >
      <div className='flex flex-col items-center justify-start pt-20 px-2 sm:px-8 md:px-16 lg:py-20 lg:px-18 min-h-screen'>
        <div>
          <div className='flex justify-between items-center py-6'>
            <h1 className="text-white font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-center">
              Descripciones
            </h1>
            <Button
              size='lg'
              variant='ghost'
              className='cursor-pointer hover:bg-gray-700 hover:text-white duration-300 gap-2'
              onClick={openCreate}
            >
              <Plus className="h-4 w-4" />
              Nueva Descripción
            </Button>
          </div>
          {descriptions && descriptions.length > 0
            ? <div className="py-6 align-middle sm:px-6 lg:px-8 bg-gray-900 text-white rounded-3xl space-y-6">
              <div className='space-y-6'>
                <h2 className="text-3xl font-bold tracking-tight">
                  Texto Principal
                </h2>
                <p>
                  Aquí se verán la descripciones que se mostrará en la página de inicio
                </p>
                <p>Solo debes de tener uno por perfil.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-9">
                  <div></div>
                  <div>
                    {descriptions.filter(desc => desc.type === 'main').map(desc => (
                      <DescrCard
                        key={desc.id}
                        desc={desc}
                        openView={openView}
                        openEdit={openEdit}
                        openDelete={openDelete}
                      />
                    ))}
                    {descriptions.filter(desc => desc.type === 'main').length <= 0 && (
                      <div className="text-center py-12 align-middle sm:px-6 lg:px-8 bg-gray-900 text-white rounded-3xl w-2xl">
                        <p className='leading-relaxed wrap-break-word'>
                          {`Aún no cuentas con una descripción para la página de Inicio`}
                        </p>
                      </div>
                    )}
                  </div>
                  <div></div>
                </div>
              </div>

              <div className='space-y-6'>
                <h2 className="text-2xl font-bold tracking-tight">Texto de la página &quot;Sobre Mi&quot;</h2>
                <p>Solo puedes tener uno por perfil.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-9">
                  {descriptions.filter(desc => desc.type === 'about').map(desc => (
                    <DescrCard
                      key={desc.id}
                      desc={desc}
                      openView={openView}
                      openEdit={openEdit}
                      openDelete={openDelete}
                    />
                  ))}
                  {descriptions.filter(desc => desc.type === 'about').length <= 0 && (
                    <p className='leading-relaxed wrap-break-word'>
                      {`Aún no cuentas con una descripción para la página "Sobre Mi"`}
                    </p>
                  )}
                </div>
              </div>
            </div>
            : <div className="text-center py-12 align-middle sm:px-6 lg:px-8 bg-gray-900 text-white rounded-3xl w-2xl">
              <h3 className="text-lg font-medium mb-2 pb-4">No se han encontrado descripciones</h3>
              <p className="text-muted-foreground mb-2">
                Aún no hay descripciones en tu portafolio.
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
            ? 'Nueva Descripción'
            : operation === 'edit'
              ? 'Editar Descripción'
              : 'Ver Descripción'
        }
        description={
          operation === 'create'
            ? 'Completa los datos para crear una nueva descripción'
            : operation === 'edit'
              ? 'Modifica los datos de la descripción'
              : 'Información de la Descripción'
        }
        data={data}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        deleteConfirmationDescription={`Esta acción no se puede deshacer. Se eliminará la descripción "${data?.name}" permanentemente.`}
      >
        {(operation, formData, setFormData) => (
          <CrudFields
            fields={descriptionFields}
            formData={formData}
            setFormData={setFormData}
            operation={operation}
          />
        )}
      </CrudDialog>
    </section>
  )
}
