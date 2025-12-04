"use client";

import { Project } from '@/schemas/projectSchema';
import { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { Button } from '../ui/button';

type ProjectDialogProps = {
    project: Project;
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

function ProjectDialog({ project, isDialogOpen, setIsDialogOpen }: ProjectDialogProps) {
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[625px] bg-gray-900">
                <DialogHeader>
                    <DialogTitle className='text-2xl'>
                        {project.title}
                    </DialogTitle>
                </DialogHeader>
                {project.img_url &&
                    <Image
                        src={project.img_url}
                        alt={project.title}
                        width={250}
                        height={250}
                        className="w-full h-full object-cover"
                    />
                }
                <p>{project.description}</p>
                <h3>Tecnologías</h3>
                <div className='flex flex-col md:flex-row space-y-2 md:space-x-2'>
                    {project && project.techs && project.techs.map(tech => (
                        <Button
                            key={tech.id}
                            className='bg-gray-800'
                        >
                            {tech.name}
                        </Button>
                    ))}
                </div>
                <DialogFooter>
                    {project.demo_url &&
                        <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p className="text-white transition-colors duration-300 ease-out hover:text-[#ff7f50] text-center my-5">
                                &lt; Demo /&gt;
                            </p>
                        </a>
                    }
                    {project.github_url &&
                        <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer">
                            <p className="text-white transition-colors duration-300 ease-out hover:text-[#ff7f50] text-center my-5">
                                &lt; Respositorio /&gt;
                            </p>
                        </a>
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProjectDialog