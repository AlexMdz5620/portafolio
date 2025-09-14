import { apiFetch } from './api';
import { Course, Project, Tech, User } from '@/schemas/zodSchema';

export const publicService = {
    getProfile: () => apiFetch<User>('/public/profile/1'),
    getProjects: () => apiFetch<Project[]>('/public/projects/1'),
    getTech: () => apiFetch<Tech[]>('/public/techs/1'),
    getCourses: () => apiFetch<Course[]>('/public/courses/1')
}