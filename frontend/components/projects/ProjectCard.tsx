import { Project } from '@/schemas/projectSchema';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface ProjectCardProps {
    project: Project;
    setIsDialogOpen: () => void;
    setProject: Dispatch<SetStateAction<Project | undefined>>

}

export default function ProjectCard({ project, setIsDialogOpen, setProject }: ProjectCardProps) {
    if (project) return (
        <div
            key={project.id}
            className="bg-[#303841] shadow-md rounded-sm h-72 transition-transform duration-300 ease-out hover:scale-105"
        >
            <div className="h-[calc(100%-6.8rem)] w-full overflow-hidden">
                {project && project.img_url &&
                    <Image
                        src={project.img_url}
                        alt={project.title}
                        width={250}
                        height={250}
                        className="w-full h-full object-cover"
                    />
                }
            </div>
            <p className="text-white text-1xl transition-colors duration-300 ease-out text-center mt-5">
                &lt; {project.title} /&gt;
            </p>
            <div className='flex justify-center'>
                <Button
                    variant='ghost'
                    className="text-white text-1xl transition-colors duration-300 ease-out hover:text-[#ff7f50] hover:bg-transparent"
                    onClick={() => {
                        setIsDialogOpen();
                        setProject(project);
                    }}
                >
                    <Eye className='h-4 w-4' />
                </Button>
            </div>
        </div>
    );
}