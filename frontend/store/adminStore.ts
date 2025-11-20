import { Courses } from '@/schemas/courseSchema';
import { Descriptions } from '@/schemas/descriptionSchema';
import { Links } from '@/schemas/linkSchema';
import { Projects } from '@/schemas/projectSchema';
import { Techs } from '@/schemas/techSchema';
import { User } from '@/schemas/userSchema';
import {
    adminCourseService,
    adminDescriptionService,
    adminLinkService,
    adminProfileService,
    adminProjectService,
    adminTechService
} from '@/service/authService';
import { create } from 'zustand';

interface AdminState {
    // Datos
    profile: User | null;
    projects: Projects | null;
    courses: Courses | null;
    techs: Techs | null;
    links: Links | null;
    descriptions: Descriptions | null;

    // Setters
    setProfile: (profile: User) => void;
    setProjects: (projects: Projects) => void;
    setCourses: (courses: Courses) => void;
    setTechs: (techs: Techs) => void;
    setLinks: (links: Links) => void;
    setDescriptions: (descriptions: Descriptions) => void;

    // Loaders
    loadProfile: (auth: { Authorization: string }) => Promise<void>;
    loadProjects: (auth: { Authorization: string }) => Promise<void>;
    loadCourses: (auth: { Authorization: string }) => Promise<void>;
    loadTechs: (auth: { Authorization: string }) => Promise<void>;
    loadLinks: (auth: { Authorization: string }) => Promise<void>;
    loadDescriptions: (auth: { Authorization: string }) => Promise<void>;
}

export const useAdminStore = create<AdminState>(set => ({
    // Estado inicial
    profile: null,
    projects: null,
    courses: null,
    techs: null,
    links: null,
    descriptions: null,

    // Setters
    setProfile: (profile) => set({ profile }),
    setProjects: (projects) => set({ projects }),
    setCourses: (courses) => set({ courses }),
    setTechs: (techs) => set({ techs }),
    setLinks: (links) => set({ links }),
    setDescriptions: (descriptions) => set({ descriptions }),

    // Loaders individuales
    loadProfile: async (auth) => {
        try {
            const profile = await adminProfileService.getProfile(auth);
            set({ profile });
        } catch (error) {
            console.error('Error al cargar el perfil', error);
        }
    },
    loadProjects: async (auth) => {
        try {
            const projects = await adminProjectService.findAll(auth);
            set({ projects });
        } catch (error) {
            console.error('Error al cargar el proyecto', error);
        }
    },
    loadCourses: async (auth) => {
        try {
            const courses = await adminCourseService.findAll(auth);
            set({ courses });
        } catch (error) {
            console.error('Error al cargar los cursos', error);
        }
    },
    loadTechs: async (auth) => {
        try {
            const techs = await adminTechService.findAll(auth);
            set({ techs });
        } catch (error) {
            console.error('Error al cargar las tecnologías', error);
        }
    },
    loadLinks: async (auth) => {
        try {
            const links = await adminLinkService.findAll(auth);
            set({ links });
        } catch (error) {
            console.error('Error al cargar los links', error);
        }
    },
    loadDescriptions: async (auth) => {
        try {
            const descriptions = await adminDescriptionService.getAll(auth);
            set({ descriptions });
        } catch (error) {
            console.error('Error al cargar las descripciones', error);
        }
    },
}))
