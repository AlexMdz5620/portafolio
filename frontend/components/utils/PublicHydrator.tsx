"use client";

import { useEffect } from "react";
import { usePublicStore } from "@/store/publicStore";
import { User } from '@/schemas/userSchema';
import { Project } from '@/schemas/projectSchema';
import { Tech } from '@/schemas/techSchema';
import { Course } from '@/schemas/courseSchema';

type InitialData = {
    profile?: User;
    projects?: Project[];
    techs?: Tech[];
    courses?: Course[];
};

export default function PublicHydrator({ initialData }: { initialData: InitialData }) {
    const { setProfile, setProjects, setTechs, setCourses } = usePublicStore();

    useEffect(() => {
        if (!initialData) return;
        if (initialData.profile) setProfile(initialData.profile);
        if (initialData.projects) setProjects(initialData.projects);
        if (initialData.techs) setTechs(initialData.techs);
        if (initialData.courses) setCourses(initialData.courses);
        // solo lo ejecuta en mount
    }, [initialData, setProfile, setProjects, setTechs, setCourses]);

    return null; // no renderiza UI
}
