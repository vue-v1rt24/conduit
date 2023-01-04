import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import {fetchRequest} from '../utils/utilsFetchRequest';

export const useAddToFavoritesStore = defineStore('favorites', () => {
    const addRemoveToFavorite = async (slug: string, isFavorite: boolean) => {
        try {
            const method = isFavorite ? 'DELETE' : 'POST';

            return await fetchRequest(`/articles/${slug}/favorite`, method);
        } catch (error) {
            throw error;
        }
    };

    return {
        addRemoveToFavorite,
    };
});