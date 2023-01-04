import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import {fetchRequest} from '../utils/utilsFetchRequest';
import {TypeUserProfile} from '../types/auth.types';

export const useUserProfile = defineStore('profile', () => {
    const userCurrentProfile = ref(null as TypeUserProfile | null);

    //
    const getUserCurrentProfile = computed(() => userCurrentProfile.value);

    //
    const getUserProfile = async (slug: string): Promise<TypeUserProfile> => {
        try {
            const user = await fetchRequest(`/profiles/${slug}`);
            userCurrentProfile.value = user.profile;
            return await user.profile;
        } catch (error) {
            throw error;
        }
    };

    return {
        userCurrentProfile,
        getUserCurrentProfile,
        getUserProfile,
    };
});