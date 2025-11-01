import { User } from '@/schemas/userSchema';
import { create } from 'zustand';

interface AdminState {
    profile: User | null;
    setProfile: (profile: User) => void;
}

export const useAdminStore = create<AdminState>(set => ({
    profile: null,
    setProfile: (profile) => set({ profile }),
}))