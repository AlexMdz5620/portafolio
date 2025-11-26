"use client";

import { changePassword, updateProfile } from '@/actions/profile.action';
import { CrudDialog, useCrudDialog } from '@/components/dialog/CrudDialog';
import CrudFields from '@/components/dialog/CrudFields';
import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdminStore } from '@/store/adminStore';
import { objectToFormData } from '@/utils';
import { TabsContent } from '@radix-ui/react-tabs';
import { Key, Lock, Mail, Pencil, User } from 'lucide-react';
import Image from 'next/image';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function UserPage() {
  const { profile } = useAdminStore();
  const [activeTab, setActiveTab] = useState('view');
  const [imageUrl, setImageUrl] = useState(profile?.photo_url || '');

  // Hook para el diálogo de cambio de contraseña
  const {
    isOpen: isPasswordDialogOpen,
    operation: passwordOperation,
    openCreate: openPasswordDialog,
    close: closePasswordDialog
  } = useCrudDialog();

  // Action para cambiar contraseña
  const handleChangePassword = async (formDataObj: Record<string, unknown>) => {
    // Aquí llamarías a tu server action para cambiar contraseña
    const formData = objectToFormData(formDataObj);
    return await changePassword(formData);
  };

  // Campos para el formulario de cambio de contraseña
  const passwordFields = [
    {
      name: 'current_password',
      label: 'Contraseña Actual',
      type: 'password' as const,
      required: true,
      placeholder: 'Ingresa tu contraseña actual'
    },
    {
      name: 'new_password',
      label: 'Nueva Contraseña',
      type: 'password' as const,
      required: true,
      placeholder: 'Ingresa tu nueva contraseña'
    },
    {
      name: 'confirm_password',
      label: 'Confirmar Nueva Contraseña',
      type: 'password' as const,
      required: true,
      placeholder: 'Confirma tu nueva contraseña'
    },
  ];

  const [state, dispatch] = useActionState(updateProfile, {
    success: false,
    msg: '',
    errors: []
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.msg);
    }
    if (state.errors.length > 0) {
      toast.error(state.msg);
    }
  }, [state]);

  // Actualizar imageUrl cuando cambie el perfil
  useEffect(() => {
    if (profile?.photo_url) {
      setImageUrl(profile.photo_url);
    }
  }, [profile]);

  return (
    <section className="w-full bg-linear-to-br from-[#3a3d40] to-[#181719] min-h-screen">
      <div className="flex flex-col items-center justify-start pt-20 px-4 sm:px-6 md:px-8 lg:pt-24 lg:px-12 min-h-screen">
        {/* Header */}
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center py-6 mb-8">
            <h1 className="text-white font-heading font-bold text-3xl md:text-4xl lg:text-5xl">
              Perfil
            </h1>
          </div>

          {/* Tabs Container */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-6 pt-6">
                <TabsList className="w-full bg-gray-800/50 p-1 rounded-2xl border border-gray-700">
                  <TabsTrigger
                    value="view"
                    className={`flex-1 rounded-xl transition-all duration-300 ${activeTab !== 'view' ? 'text-white' : ''}`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Información</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="edit"
                    className={`flex-1 rounded-xl transition-all duration-300 ${activeTab !== 'edit' ? 'text-white' : ''}`}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    <span className="font-semibold">Editar</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* View Tab Content */}
              <TabsContent value="view" className="p-6 md:p-8">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                  {/* Profile Image */}
                  <div>
                    <div className="relative">
                      {profile?.photo_url ? (
                        <div className="relative">
                          <Image
                            src={profile.photo_url}
                            alt="Imagen de perfil"
                            width={200}
                            height={200}
                            className="rounded-2xl object-cover border-none shadow-2xl w-48 h-48 lg:w-56 lg:h-56"
                          />
                          <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/10 to-purple-600/10 border border-none shadow-inner" />
                        </div>
                      ) : (
                        <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl bg-linear-to-br from-gray-700 to-gray-600 border-4 border-blue-500/20 flex items-center justify-center shadow-2xl">
                          <User className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Profile Information */}
                  <div className="flex-1 space-y-6 text-center lg:text-left justify-center">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                        {profile?.name} {profile?.lastname}
                      </h2>
                      <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-300 mt-4">
                        <Mail className="w-5 h-5 text-blue-400" />
                        <span className="text-lg">{profile?.email}</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                      <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-blue-400">
                          {profile?.courses?.length || 0}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">Cursos</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-green-400">
                          {profile?.projects?.length || 0}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">Proyectos</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-purple-400">
                          {profile?.techs?.length || 0}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">Tecnologías</div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </TabsContent>

              {/* Edit Tab Content */}
              <TabsContent value="edit" className="p-6 md:p-8">
                <form action={dispatch} className="space-y-6">
                  <input type="hidden" name="photo_url" value={imageUrl} />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-3">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Nombre *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          defaultValue={profile?.name || ''}
                          required
                          className="bg-gray-800/50 border-gray-700 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          placeholder="Tu nombre"
                        />
                      </div>
                    </div>

                    {/* Lastname Field */}
                    <div className="space-y-3">
                      <label htmlFor="lastname" className="block text-sm font-medium text-gray-300">
                        Apellido *
                      </label>
                      <Input
                        id="lastname"
                        name="lastname"
                        type="text"
                        defaultValue={profile?.lastname || ''}
                        required
                        className="bg-gray-800/50 border-gray-700 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                        placeholder="Tu apellido"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-3 lg:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          defaultValue={profile?.email || ''}
                          required
                          className="bg-gray-800/50 border-gray-700 pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                          placeholder="tu.email@ejemplo.com"
                        />
                      </div>
                    </div>

                    {/* Image Upload Field */}
                    <div className="space-y-3 lg:col-span-2">
                      <label className="block text-sm font-medium text-gray-300">
                        Foto de Perfil
                      </label>
                      <div className="bg-gray-800/50 rounded-2xl p-6 border-2 border-dashed border-gray-700/50 backdrop-blur-sm">
                        <ImageUpload
                          onImageUpload={(url) => setImageUrl(url)}
                          existingImageUrl={imageUrl}
                          folder="portafolio/profile"
                          operation="edit"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sección de Seguridad */}
                  <div className="border-t border-gray-700/50 pt-8 mt-8">
                    <div className='flex items-center gap-3 mb-6'>
                      <Lock className='w-6 h-6 text-blue-400' />
                      <h3 className="text-xl font-semibold text-white">Seguridad</h3>
                    </div>
                    <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h4 className="text-lg font-medium text-white mb-1">Cambiar Contraseña</h4>
                          <p className="text-gray-400 text-sm">
                            Actualiza tu contraseña para mantener segura tu cuenta
                          </p>
                        </div>
                        <Button
                          type="button"
                          onClick={openPasswordDialog}
                          variant="outline"
                          className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                        >
                          <Key className="w-4 h-4 mr-2" />
                          Cambiar Contraseña
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    >
                      Guardar Cambios
                    </Button>
                  </div>

                  {/* Error Display */}
                  {state.errors.length > 0 && (
                    <div className="bg-red-900/30 border border-red-700/50 rounded-2xl p-4 backdrop-blur-sm">
                      <p className="text-red-300 text-sm font-medium mb-2">Errores:</p>
                      <ul className="text-red-200 text-sm list-disc list-inside space-y-1">
                        {state.errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Diálogo para Cambiar Contraseña */}
      <CrudDialog
        operation={passwordOperation}
        isOpen={isPasswordDialogOpen}
        onOpenChange={closePasswordDialog}
        title="Cambiar Contraseña"
        description="Actualiza tu contraseña para mayor seguridad"
        onSubmit={handleChangePassword}
        submitButtonText="Actualizar Contraseña"
      >
        {(operation, formData, setFormData) => (
          <CrudFields
            fields={passwordFields}
            formData={formData}
            setFormData={setFormData}
            operation={operation}
          />
        )}
      </CrudDialog>
    </section>
  );
}