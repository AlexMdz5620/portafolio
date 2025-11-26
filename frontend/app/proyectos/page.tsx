'use client';

import { useState } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import { ProjectCategory } from '@/schemas/projectSchema';
import { usePublicStore } from '@/store/publicStore';

export default function ProyectosPage() {
  const { projects } = usePublicStore();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('todos');

  const uniqueCategories = ['todos', ...Array.from(new Set(projects.map(project => project.type)))].sort();

  const filteredProjects = selectedCategory === 'todos'
    ? projects
    : projects.filter(project => project.type === selectedCategory);

  const formatCategoryText = (category: string) => {
    if (category === 'todos') return 'Todos los proyectos';
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  return (
    <div className="pt-16 min-h-screen bg-linear-to-b from-[#3a3d40] to-[#181719]">
      {/* Sección de Selección */}
      <section className="flex flex-col items-center justify-center py-12 px-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          ¿Qué tipo de proyectos quieres ver?
        </h3>

        <div className="relative w-full max-w-md">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory | 'todos')}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
          >
            {uniqueCategories.map(category => (
              <option
                key={category}
                value={category}
                className="bg-gray-800 text-white py-2"
              >
                {formatCategoryText(category)}
              </option>
            ))}
          </select>
          {/* Flecha personalizada para el select */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Contador de proyectos */}
        <div className="mt-4 text-gray-300 text-sm">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'proyecto' : 'proyectos'} encontrados
          {selectedCategory !== 'todos' && ` en ${formatCategoryText(selectedCategory)}`}
        </div>
      </section>

      {/* Sección de Proyectos */}
      <section className="py-16 bg-[#45567d] px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white text-xl">No hay proyectos en esta categoría.</p>
            <button
              onClick={() => setSelectedCategory('todos')}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
            >
              Ver todos los proyectos
            </button>
          </div>
        )}
      </section>
    </div>
  );
}