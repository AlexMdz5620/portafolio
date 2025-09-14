'use client';

import { useState } from 'react';
import ProjectCard from '@/components/projects/ProjectCard';
import { ProjectCategory } from '@/types';
import { usePublicStore } from '@/store/publicStore';

// Datos de los proyectos
// const projects: Project[] = [
//   {
//     id: 1,
//     image: "/proyectos_img/perso/enciclopedio_del_invocador.png",
//     title: "Enciclopedia del Invocador",
//     link: "https://alexmdz5620.github.io/LoL-encyclopedia/",
//     category: "personales"
//   },
//   {
//     id: 2,
//     image: "/proyectos_img/perso/calculadora_básica.png",
//     title: "Calculadora Básica",
//     link: "https://alexmdz5620.github.io/basic_calculator/",
//     category: "personales"
//   },
//   {
//     id: 3,
//     image: "/proyectos_img/perso/db_macrociclo.png",
//     title: "API de Conceptos de Teo. y Met. del Entrenamiento",
//     link: "https://github.com/AlexMdz5620/api_training_theory_and_methodology",
//     category: "personales"
//   },
//   {
//     id: 4,
//     image: "/proyectos_img/dev.f/simulador_atm.png",
//     title: "Simulador de un ATM",
//     link: "https://alexmdz5620.github.io/proyecto-simulador-atm/#",
//     category: "dev_f"
//   },
//   {
//     id: 5,
//     image: "/proyectos_img/dev.f/clone_pinterest.png",
//     title: "Clon de Pinterest",
//     link: "https://alexmdz5620.github.io/proyecto-clon-pinterest/",
//     category: "dev_f"
//   },
//   {
//     id: 6,
//     image: "/proyectos_img/frontend_mentor/FQA.png",
//     title: "FQA Carta en Acordeón",
//     link: "https://alexmdz5620.github.io/frontend-mentor-faq-accordion-card/",
//     category: "frontend_mentor"
//   },
//   {
//     id: 7,
//     image: "/proyectos_img/dev.f/enciclopedia_items_LoL.png",
//     title: "Enciclopedia de Ítems",
//     link: "https://alexmdz5620.github.io/proyecto-enciclopedia-items-lol/",
//     category: "dev_f"
//   },
//   {
//     id: 8,
//     image: "/proyectos_img/dev.f/pokedex.png",
//     title: "Pokedex",
//     link: "https://alexmdz5620.github.io/proyecto-pokedex/",
//     category: "dev_f"
//   },
//   {
//     id: 9,
//     image: "/proyectos_img/frontend_mentor/codigo_QR.png",
//     title: "Código QR",
//     link: "https://alexmdz5620.github.io/frontend-mentor-qr-code/",
//     category: "frontend_mentor"
//   },
//   {
//     id: 10,
//     image: "/proyectos_img/frontend_mentor/cuatro_tarjetas.png",
//     title: "Cuatro Cartas",
//     link: "https://alexmdz5620.github.io/frontend-mentor-four-card/",
//     category: "frontend_mentor"
//   },
//   {
//     id: 11,
//     image: "/proyectos_img/frontend_mentor/resumen_resultado.png",
//     title: "Componente de Resumen de Resultados",
//     link: "https://alexmdz5620.github.io/frontend-mentor-results-summary-component/",
//     category: "frontend_mentor"
//   },
//   {
//     id: 12,
//     image: "/proyectos_img/frontend_mentor/carta_perfume.png",
//     title: "Componente de Tarjeta de Vista Previa Principal",
//     link: "https://alexmdz5620.github.io/frontend-mentor-product-preview-card-component-main/",
//     category: "frontend_mentor"
//   },
//   {
//     id: 13,
//     image: "/proyectos_img/frontend_mentor/clasificacion_interactivo.png",
//     title: "Componente de Clasificación Interactivo",
//     link: "https://alexmdz5620.github.io/frontend-mentor-interactive-rating-component-main/",
//     category: "frontend_mentor"
//   },
//   {
//     id: 14,
//     image: "/proyectos_img/frontend_mentor/nft.png",
//     title: "Carta de NFT",
//     link: "https://alexmdz5620.github.io/frontend-mentor-nft-preview-card-component/",
//     category: "frontend_mentor"
//   },
//   {
//     id: 15,
//     image: "/proyectos_img/frontend_mentor/resumen_pedido.png",
//     title: "Resumen del pedido",
//     link: "https://alexmdz5620.github.io/frontend-mentor-order-summary-component/",
//     category: "frontend_mentor"
//   },
//   {
//     id: 16,
//     image: "/proyectos_img/frontend_mentor/estadisticas.png",
//     title: "Tarjeta de Vista Previa de Estadísticas",
//     link: "https://alexmdz5620.github.io/frontend-mentor-stats-preview-card-component-main/",
//     category: "frontend_mentor"
//   },
//   {
//     id: 17,
//     image: "/proyectos_img/frontend_mentor/3cartas.png",
//     title: "Tarjeta de Vista Previa de 3 Columnas",
//     link: "https://alexmdz5620.github.io/frontend-mentor-3-column-preview-card-component/",
//     category: "frontend_mentor"
//   },
//   {
//     id: 18,
//     image: "/proyectos_img/frontend_mentor/prueba_social.png",
//     title: "Sección de Prueba Social",
//     link: "https://alexmdz5620.github.io/frontend-mentor-social-proof-section/",
//     category: "frontend_mentor"
//   },
//   {
//     id: 19,
//     image: "/proyectos_img/dev.f/groceries_don_rufino.png",
//     title: "DB y BackEnd de Abarrotes Don Rufino",
//     link: "https://github.com/AlexMdz5620/project-groceries-don-rufino",
//     category: "dev_f"
//   },
//   {
//     id: 20,
//     image: "/proyectos_img/dev.f/backend_cinema.png",
//     title: "DB y BackEnd de un Cine",
//     link: "https://github.com/AlexMdz5620/project-backend-cinema",
//     category: "dev_f"
//   }
// ];

// Opciones del filtro
const filterOptions = [
  { value: 'todos', label: 'Todos' },
  { value: 'dev_f', label: 'Dev.F' },
  { value: 'frontend_mentor', label: 'Frontend Mentor' },
  { value: 'personales', label: 'Personales' }
];

export default function ProyectosPage() {
  const { projects } = usePublicStore();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('todos');

  // const filteredProjects = selectedCategory === 'todos'
  //   ? projects
  //   : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-[#3a3d40] to-[#181719]">
      {/* Sección de Selección */}
      <section className="flex flex-col items-center justify-center py-12 px-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          ¿Cuáles proyectos quieres ver?
        </h3>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory)}
          className="select-custom"
        >
          <option value="" disabled>Selecciona una opción</option>
          {filterOptions.map(option => (
            <option
              key={option.value}
              value={option.value}
              className='text-[#3a3d40]'
            >
              {option.label}
            </option>
          ))}
        </select>
      </section>

      {/* Sección de Proyectos */}
      <section className="py-16 bg-[#45567d] px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white text-xl">No hay proyectos en esta categoría.</p>
          </div>
        )}
      </section>
    </div>
  );
}


// export const metadata = {
//   title: "Proyectos - Alex Mendoza",
//   description: "Explora los proyectos de desarrollo web de Alex Mendoza, incluyendo proyectos personales, de Dev.F y desafíos de Frontend Mentor.",
// };