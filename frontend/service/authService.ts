import { apiFetch } from './api';
import { ChangePassForm } from '@/schemas/zodSchema';
import { User, UserForm } from '@/schemas/userSchema';
import { Course, CourseFormData } from '@/schemas/courseSchema';
import { Project, ProjectForm } from '@/schemas/projectSchema';
import { Tech, TechForm } from '@/schemas/techSchema';
import { Link, LinkForm } from '@/schemas/linkSchema';
import { Description, DescriptionForm } from '@/schemas/descriptionSchema';

// Profile
export const adminProfileService = {
    getProfile: (auth: {
        Authorization: string;
    }) => apiFetch<User>('/users/me', {
        headers: auth,
    }),
    updateProfile: (body: UserForm, auth: {
        Authorization: string;
    }) => apiFetch<User>('/users/me', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify(body),
    }),
    updatePass: (body: ChangePassForm, auth: {
        Authorization: string;
    }) => apiFetch('/users/me/password', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify(body)
    }),
    // TODO:
    // changeImg: () => apiFetch('upload-photo')
}

// Course
export const adminCourseService = {
    create: (body: CourseFormData, auth: {
        Authorization: string;
    }) => apiFetch('/courses', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify(body),
    }),
    findAll: (auth: {
        Authorization: string;
    }) => apiFetch('/courses', { headers: auth }),
    findOne: (id: Course['id'], auth: {
        Authorization: string;
    }): Promise<Course> => apiFetch(`/courses/${id}`, { headers: auth }),
    update: (id: Course['id'], body: CourseFormData, auth: {
        Authorization: string;
    }) => apiFetch(`/courses/${id}`, {
        method: 'PATCH',
        headers: auth,
        body: JSON.stringify(body),
    }),
    delete: (id: Course['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/courses/${id}`, {
        method: 'DELETE',
        headers: auth,
    }),
    // TODO:
    // uploadImgCourse: () => apiFetch(`/courses/${id}/upload-img`)
}

// Project
export const adminProjectService = {
    create: (body: ProjectForm, auth: {
        Authorization: string;
    }) => apiFetch('/projects', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify(body),
    }),
    findAll: (auth: {
        Authorization: string;
    }) => apiFetch('/projects', { headers: auth }),
    findOne: (id: Project['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/projects/${id}`, { headers: auth }),
    update: (id: Project['id'], body: ProjectForm, auth: {
        Authorization: string;
    }) => apiFetch(`/projects/${id}`, {
        method: 'PATCH',
        headers: auth,
        body: JSON.stringify(body),
    }),
    delete: (id: Project['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/projects/${id}`, {
        method: 'DELETE',
        headers: auth,
    }),
    removeTech: (id: Project['id'], body: Project['techId'], auth: {
        Authorization: string;
    }) => apiFetch(`/projects/${id}/remove-tech`, {
        method: 'PATCH',
        headers: auth,
        body: JSON.stringify(body),
    })
}

// Tech
export const adminTechService = {
    create: (body: TechForm, auth: {
        Authorization: string;
    }) => apiFetch('/techs', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify(body),
    }),
    findAll: (auth: {
        Authorization: string;
    }) => apiFetch('/techs', { headers: auth }),
    findOne: (id: Tech['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/techs/${id}`, { headers: auth }),
    update: (id: Tech['id'], body: TechForm, auth: {
        Authorization: string;
    }) => apiFetch(`/techs/${id}`, {
        method: 'PATCH',
        headers: auth,
        body: JSON.stringify(body),
    }),
    delete: (id: Tech['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/techs/${id}`, {
        method: 'DELETE',
        headers: auth,
    })
}

// Link
export const adminLinkService = {
    create: (body: LinkForm, auth: {
        Authorization: string;
    }) => apiFetch('/links', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify(body),
    }),
    findAll: (auth: {
        Authorization: string;
    }) => apiFetch('/links', { headers: auth }),
    findOne: (id: Link['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/links/${id}`, { headers: auth }),
    update: (id: Link['id'], body: LinkForm, auth: {
        Authorization: string;
    }) => apiFetch(`/links/${id}`, {
        method: 'PATCH',
        headers: auth,
        body: JSON.stringify(body),
    }),
    delete: (id: Link['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/links/${id}`, {
        method: 'DELETE',
        headers: auth,
    })
}

// Description
export const adminDescriptionService = {
    create: (body: DescriptionForm, auth: {
        Authorization: string;
    }) => apiFetch('/description', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify(body),
    }),
    getAll: (auth: {
        Authorization: string;
    }) => apiFetch('/description', { headers: auth }),
    getOne: (id: Description['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/description/${id}`, { headers: auth }),
    update: (id: Description['id'], body: DescriptionForm, auth: {
        Authorization: string;
    }) => apiFetch(`/description/${id}`, {
        method: 'PATCH',
        headers: auth,
        body: JSON.stringify(body),
    }),
    delete: (id: Description['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/description/${id}`, {
        method: 'DELETE',
        headers: auth
    }),
}
