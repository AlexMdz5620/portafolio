import { apiFetch } from './api';
import { ChangePassForm } from '@/schemas/zodSchema';
import { User, UserFormData,  } from '@/schemas/userSchema';
import { Course, CourseFormData, Courses } from '@/schemas/courseSchema';
import { Project, ProjectFormData, Projects,  } from '@/schemas/projectSchema';
import { Tech, TechFormData, Techs,  } from '@/schemas/techSchema';
import { Link, LinkFormData, Links,  } from '@/schemas/linkSchema';
import { Description, DescriptionFormData, Descriptions,  } from '@/schemas/descriptionSchema';

// Profile
export const adminProfileService = {
    getProfile: (auth: {
        Authorization: string;
    }) => apiFetch<User>('/users/me', {
        headers: auth,
    }),
    updateProfile: (body: UserFormData, auth: {
        Authorization: string;
    }) => apiFetch<User>('/users/me', {
        method: 'PUT',
        headers: auth,
        body: JSON.stringify(body),
    }),
    updatePass: (body: ChangePassForm, auth: {
        Authorization: string;
    }) => apiFetch('/users/me/password', {
        method: 'PATCH',
        headers: auth,
        body: JSON.stringify(body)
    }),
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
    }): Promise<Courses> => apiFetch('/courses', { headers: auth }),
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
    delete: (id: Course['id'], password: string, auth: {
        Authorization: string;
    }) => apiFetch(`/courses/${id}`, {
        method: 'DELETE',
        headers: auth,
        body: JSON.stringify({ password }),
    }),
}

// Project
export const adminProjectService = {
    create: (body: ProjectFormData, auth: {
        Authorization: string;
    }) => apiFetch('/projects', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify(body),
    }),
    findAll: (auth: {
        Authorization: string;
    }): Promise<Projects> => apiFetch('/projects', { headers: auth }),
    findOne: (id: Project['id'], auth: {
        Authorization: string;
    }): Promise<Project> => apiFetch(`/projects/${id}`, { headers: auth }),
    update: (id: Project['id'], body: ProjectFormData, auth: {
        Authorization: string;
    }) => apiFetch(`/projects/${id}`, {
        method: 'PUT',
        headers: auth,
        body: JSON.stringify(body),
    }),
    delete: (id: Project['id'], password: string, auth: {
        Authorization: string;
    }) => apiFetch(`/projects/${id}`, {
        method: 'DELETE',
        headers: auth,
        body: JSON.stringify({ password }),
    })
}

// Tech
export const adminTechService = {
    create: (body: TechFormData, auth: {
        Authorization: string;
    }) => apiFetch('/techs', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify(body),
    }),
    findAll: (auth: {
        Authorization: string;
    }): Promise<Techs> => apiFetch('/techs', { headers: auth }),
    findOne: (id: Tech['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/techs/${id}`, { headers: auth }),
    update: (id: Tech['id'], body: TechFormData, auth: {
        Authorization: string;
    }) => apiFetch(`/techs/${id}`, {
        method: 'PATCH',
        headers: auth,
        body: JSON.stringify(body),
    }),
    delete: (id: Tech['id'], password: string, auth: {
        Authorization: string;
    }) => apiFetch(`/techs/${id}`, {
        method: 'DELETE',
        headers: auth,
        body: JSON.stringify({ password })
    })
}

// Link
export const adminLinkService = {
    create: (body: LinkFormData, auth: {
        Authorization: string;
    }) => apiFetch('/links', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify(body),
    }),
    findAll: (auth: {
        Authorization: string;
    }): Promise<Links> => apiFetch('/links', { headers: auth }),
    findOne: (id: Link['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/links/${id}`, { headers: auth }),
    update: (id: Link['id'], body: LinkFormData, auth: {
        Authorization: string;
    }) => apiFetch(`/links/${id}`, {
        method: 'PATCH',
        headers: auth,
        body: JSON.stringify(body),
    }),
    delete: (id: Link['id'], password: string, auth: {
        Authorization: string;
    }) => apiFetch(`/links/${id}`, {
        method: 'DELETE',
        headers: auth,
    })
}

// Description
export const adminDescriptionService = {
    create: (body: DescriptionFormData, auth: {
        Authorization: string;
    }) => apiFetch('/description', {
        method: 'POST',
        headers: auth,
        body: JSON.stringify(body),
    }),
    getAll: (auth: {
        Authorization: string;
    }): Promise<Descriptions> => apiFetch('/description', { headers: auth }),
    getOne: (id: Description['id'], auth: {
        Authorization: string;
    }) => apiFetch(`/description/${id}`, { headers: auth }),
    update: (id: Description['id'], body: DescriptionFormData, auth: {
        Authorization: string;
    }) => apiFetch(`/description/${id}`, {
        method: 'PATCH',
        headers: auth,
        body: JSON.stringify(body),
    }),
    delete: (id: Description['id'], password: string, auth: {
        Authorization: string;
    }) => apiFetch(`/description/${id}`, {
        method: 'DELETE',
        headers: auth,
        body: JSON.stringify({ password }),
    }),
}
