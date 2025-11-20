"use client";

import { Courses } from '@/schemas/courseSchema';
import { Descriptions } from '@/schemas/descriptionSchema';
import { Links } from '@/schemas/linkSchema';
import { Projects } from '@/schemas/projectSchema';
import { Techs } from '@/schemas/techSchema';
import { User } from '@/schemas/userSchema';
import { useAdminStore } from '@/store/adminStore';
import { useEffect } from 'react';

interface AuthHydratorProps {
    profile: User;
    projects: Projects;
    courses: Courses;
    techs: Techs;
    links: Links;
    descriptions: Descriptions;
}

export default function AuthHydrator({
    profile,
    projects,
    courses,
    techs,
    links,
    descriptions
}: AuthHydratorProps) {
    const {
        setProfile,
        setProjects,
        setCourses,
        setTechs,
        setLinks,
        setDescriptions
    } = useAdminStore();

    useEffect(() => {
        if (profile) setProfile(profile);
        if (projects) setProjects(projects);
        if (courses) setCourses(courses);
        if (techs) setTechs(techs);
        if (links) setLinks(links);
        if (descriptions) setDescriptions(descriptions);
    }, [
        profile, projects, courses, techs, links, descriptions,
        setProfile, setProjects, setCourses, setTechs, setLinks, setDescriptions
    ]);


    return null;
}
