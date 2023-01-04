import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import {IFeedData, IFeedActionsTypes} from '../types/feed.types';
import {fetchRequest} from '../utils/utilsFetchRequest';

export const useFeedStore = defineStore('feed', () => {
    const articles = ref({} as IFeedData);

    //
    const getData = computed(() => articles.value);

    //
    const feedAction = async ({apiUrl}: IFeedActionsTypes) => {
        try {
            articles.value = await fetchRequest(apiUrl);
            return articles.value;
        } catch (error) {
            throw error;
        }
    };

    return {
        articles,
        getData,
        feedAction,
    };
});