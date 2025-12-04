"use client";

import Link from 'next/link';
import ProjectCard from './projects/ProjectCard';
import { usePublicStore } from '@/store/publicStore';
import { useState } from 'react';
import { Project } from '@/schemas/projectSchema';
import ProjectDialog from './projects/ProjectDialog';

export default function ProjectsSection() {
    const { projects } = usePublicStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [project, setProject] = useState<Project>();

    return (
        <section
            id="projects"
            className="text-center bg-[#45567d] w-full"
        >
            <div className='flex flex-col items-center justify-start pt-20 px-4 sm:px-8 md:px-16 lg:py-32 lg:px-32 min-h-screen'>
                <h2 className="max-w-4xl mx-auto mb-10 pb-2 border-b-2 border-white text-white text-3xl md:text-4xl font-semibold">
                    Aquí están algunos de mis Proyectos
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto mb-24 px-4">
                    {projects.filter(project => project.featured === true).map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            setIsDialogOpen={() => setIsDialogOpen(true)}
                            setProject={setProject}
                        />
                    ))}
                </div>

                <Link
                    href="/proyectos"
                    className="bg-[#be3144] text-white px-6 py-3 rounded transition-colors duration-300 hover:bg-[#45567d] inline-flex items-center text-lg"
                >
                    Más Proyectos
                    <i className="fas fa-chevron-right ml-2.5 transition-transform duration-300 ease-out group-hover:translate-x-1"></i>
                </Link>
            </div>

            {project &&
                <ProjectDialog
                    project={project}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                />
            }
        </section>
    );
}