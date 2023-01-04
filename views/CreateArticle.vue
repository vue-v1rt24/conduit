<template>
  <ArticleForm
      :values="values"
      :loading="loading"
      @formHandler="formHandler"
  />
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useArticleStore} from '../stores/article.store';
import {useRouter} from 'vue-router';
import ArticleForm from '../components/ArticleForm.vue';
import {IArticlesFormTypes} from '../types/articles.types';

const store = useArticleStore();
const router = useRouter();
const values = ref({} as IArticlesFormTypes);
const loading = ref(false);

//
const formHandler = async (article: IArticlesFormTypes) => {
  try {
    loading.value = true;
    const res = await store.createArticle(article);
    router.push({name: 'article', params: {slug: res.article.slug}});
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>

</style>