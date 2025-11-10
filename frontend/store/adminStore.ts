import { User } from '@/schemas/userSchema';
import { adminProfileService } from '@/service/authService';
import { create } from 'zustand';

interface AdminState {
    profile: User | null;
    setProfile: (profile: User) => void;
    loadProfile: (auth : { Authorization: string }) => Promise<void>;
}

export const useAdminStore = create<AdminState>(set => ({
    profile: null,
    setProfile: (profile) => set({ profile }),
    loadProfile: async (auth) => {
        try {
            const profile = await adminProfileService.getProfile(auth);
            set({ profile });
        } catch (error) {
            console.error('Error al cargar el perfil', error);
        }
    },
}))