import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import {fetchRequest} from '../utils/utilsFetchRequest';

export const usePopularTagsStore = defineStore('popularTags', () => {
    //
    const getTags = async (): Promise<string[]> => {
        try {
            const tags = await fetchRequest('/tags');
            return tags.tags;
        } catch (error) {
            throw error;
        }
    };

    return {
        getTags,
    };
});