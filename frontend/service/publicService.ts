import { User } from '@/schemas/userSchema';
import { apiFetch } from './api';
import { Projects } from '@/schemas/projectSchema';
import { Techs } from '@/schemas/techSchema';
import { Courses } from '@/schemas/courseSchema';

export const publicService = {
    getProfile: () => apiFetch<User>('/public/profile/1'),
    getProjects: () => apiFetch<Projects>('/public/projects/1'),
    getTech: () => apiFetch<Techs>('/public/techs/1'),
    getCourses: () => apiFetch<Courses>('/public/courses/1')
}
