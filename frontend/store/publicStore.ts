import { create } from 'zustand';
import { Course, Project, Tech, User } from '@/schemas/zodSchema';

interface PublicState {
    profile: User | null;
    projects: Project[];
    techs: Tech[];
    courses: Course[];
    setProfile: (profile: User) => void;
    setProjects: (projects: Project[]) => void;
    setTechs: (techs: Tech[]) => void;
    setCourses: (courses: Course[]) => void;
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
