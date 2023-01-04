<template>
  <Loading
      v-if="isLoading"
      class="article-preview"
      text="Загрузка записей..."
  />

  <div v-else-if="feedData.articles.length">
    <div
        v-for="article in feedData.articles"
        :key="article.slug"
        class="article-preview"
    >
      <div class="article-meta">
        <RouterLink :to="{name: 'userProfile', params: {slug: article.author.username}}">
          <img :src="article.author.image" :alt="article.author.username">
        </RouterLink>

        <div class="info">
          <RouterLink :to="{name: 'userProfile', params: {slug: article.author.username}}" class="author">
            {{ article.author.username }}
          </RouterLink>
          <span class="date">{{ article.createdAt }}</span>
        </div>

        <div class="pull-xs-right">
          <AddToFavorites
              :is-favorited="article.favorited"
              :favorites-count="article.favoritesCount"
              :article-slug="article.slug"
          />
        </div>
      </div>

      <RouterLink :to="{name: 'article', params: {slug: article.slug}}" class="preview-link">
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Подробнее...</span>

        <!-- Вывод тегов -->
        <TagList :tags="article.tagList"/>
      </RouterLink>
    </div>

    <!-- Пагинация -->
    <Pagination
        v-if="!isVisiblePagination"
        :total="feedData.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
    />
  </div>

  <div v-else class="article-preview">
    Здесь нет записей... пока.
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {useFeedStore} from '../stores/feed.store';
import {useRouter, useRoute} from 'vue-router';
import Loading from './Loading.vue';
import {IFeedData} from '../types/feed.types';
import TagList from './TagList.vue';
import AddToFavorites from './AddToFavorites.vue';
import Pagination from './Pagination.vue';

const limit = +import.meta.env.VITE_PAGINATION_LIMIT;

//
const props = defineProps<{
  apiUrl: string
}>();

//
const store = useFeedStore();
const router = useRouter();
const route = useRoute();
const isLoading = ref(true);
const feedData = ref({} as IFeedData);

//
const currentPage = computed(() => +route.query.page! || 1);
const baseUrl = computed(() => route.path);
const isVisiblePagination = computed(() => limit > feedData.value.articlesCount);

//
const fetchFeed = async () => await store.feedAction({apiUrl: props.apiUrl});

//
onMounted(async () => {
  try {
    feedData.value = await fetchFeed();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});

//
watch(() => [currentPage, props.apiUrl], async value => {
  feedData.value = await fetchFeed();
});
</script>

<style scoped>

</style>