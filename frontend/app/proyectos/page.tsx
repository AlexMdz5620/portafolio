'use client';

import { useState } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import { ProjectCategory } from '@/schemas/projectSchema';
import { usePublicStore } from '@/store/publicStore';

export default function ProyectosPage() {
  const { projects } = usePublicStore();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('todos');

  const filterOptions = projects.map(project => project.type);

  const filteredProjects = selectedCategory === 'todos'
    ? projects
    : projects.filter(project => project.type === selectedCategory);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-[#3a3d40] to-[#181719]">
      {/* Sección de Selección */}
      <section className="flex flex-col items-center justify-center py-12 px-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          ¿Cuáles proyectos quieres ver?
        </h3>

        <select
          value={""}
          onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory)}
          // className="select-custom"
        >
          <option
            value=""
            disabled
            hidden
          >
            Selecciona una opción
          </option>
          <option
            value="todos"
            className='text-[#3a3d40]'
          >Todos</option>
          {filterOptions.map(option => (
            <option
              key={option}
              value={option}
              className='text-[#3a3d40]'
            >
              {option}
            </option>
          ))}
        </select>
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
          </div>
        )}
      </section>
    </div>
  );
}
