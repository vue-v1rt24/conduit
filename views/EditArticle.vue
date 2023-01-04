<template>
  <div v-if="loadingStart" class="container">
    <Loading text="Загрузка статьи..."/>
  </div>

  <ArticleForm
      v-else
      :loading="loading"
      :values="values"
      @formHandler="formHandler"
  />
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {useArticleStore} from '../stores/article.store';
import {useRouter} from 'vue-router';
import Loading from '../components/Loading.vue';
import ArticleForm from '../components/ArticleForm.vue';
import {IArticlesFormTypes} from '../types/articles.types';
import {IFeedArticles} from '../types/feed.types';

//
const props = defineProps<{
  slug: string
}>();

//
const loadingStart = ref(true);
const loading = ref(false);
const store = useArticleStore();
const router = useRouter();
const values = ref({} as IArticlesFormTypes);

//
onMounted(async () => {
  try {
    values.value = await store.getArticle(props.slug);
  } catch (error) {
  } finally {
    loadingStart.value = false;
  }
});

//
const formHandler = async (article: IArticlesFormTypes) => {
  try {
    loading.value = true;
    const data: IFeedArticles = await store.updateArticle(props.slug, article);
    router.push({name: 'article', params: {slug: data.slug}});
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>

</style>