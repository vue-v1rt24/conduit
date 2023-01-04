import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import {fetchRequest} from '../utils/utilsFetchRequest';
import {useMessageErrorStore} from './messageError.store';
import {IArticlesFormTypes} from '../types/articles.types';
import {IFeedArticles} from '../types/feed.types';

export const useArticleStore = defineStore('article', () => {
    const getArticle = async (slug: string) => {
        try {
            const article = await fetchRequest(`/articles/${slug}`);
            return await article.article;
        } catch (error) {
            throw error;
        }
    };

    const createArticle = async (article: IArticlesFormTypes) => {
        try {
            useMessageErrorStore().clearMessage();
            return await fetchRequest(`/articles/`, 'POST', {article});
        } catch (error) {
            useMessageErrorStore().setMessage(error);
            throw error;
        }
    };

    const updateArticle = async (slug: string, article: IArticlesFormTypes): Promise<IFeedArticles> => {
        try {
            useMessageErrorStore().clearMessage();
            const data = await fetchRequest(`/articles/${slug}`, 'PUT', {article});
            return data.article;
        } catch (error) {
            useMessageErrorStore().setMessage(error);
            throw error;
        }
    };

    const deleteArticle = async (slug: string) => {
        try {
            await fetchRequest(`/articles/${slug}`, 'DELETE');
        } catch (error) {
            throw error;
        }
    };

    return {
        getArticle,
        createArticle,
        updateArticle,
        deleteArticle,
    };
});