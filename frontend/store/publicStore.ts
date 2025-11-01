import { Courses } from '@/schemas/courseSchema';
import { Projects } from '@/schemas/projectSchema';
import { Techs } from '@/schemas/techSchema';
import { User } from '@/schemas/userSchema';
import { create } from 'zustand';

interface PublicState {
    profile: User | null;
    projects: Projects;
    techs: Techs;
    courses: Courses;
    setProfile: (profile: User) => void;
    setProjects: (projects: Projects) => void;
    setTechs: (techs: Techs) => void;
    setCourses: (courses: Courses) => void;
}

export const usePublicStore = create<PublicState>(set => ({
    profile: null,
    projects: [],
    techs: [],
    courses: [],
    setProfile: (profile) => set({ profile }),
    setProjects: (projects) => set({ projects }),
    setTechs: (techs) => set({ techs }),
    setCourses: (courses) => set({ courses }),
}));
