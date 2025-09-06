import Image from 'next/image';
import { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div
            key={project.id}
            className="bg-[#303841] shadow-md rounded-sm h-[18rem] transition-transform duration-300 ease-out hover:scale-105"
        >
            <div className="h-[calc(100%-6.8rem)] w-full overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={250}
                    height={250}
                    className="w-full h-full object-cover"
                />
            </div>
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"

            >
                <p className="text-white text-2xl  transition-colors duration-300 ease-out hover:text-[#ff7f50] text-center my-5">
                    &lt; {project.title} /&gt;
                </p>
            </a>
        </div>
    );
}