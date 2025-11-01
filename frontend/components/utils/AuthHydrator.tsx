"use client";

import { User } from '@/schemas/userSchema';
import { useAdminStore } from '@/store/adminStore';
import { useEffect } from 'react';

export default function AuthHydrator({ profile }: { profile: User }) {
    const { setProfile } = useAdminStore();

    useEffect(() => {
        if (!profile) return;
        if (profile) setProfile(profile);
    }, [profile, setProfile]);

    return null;
}
