<template>
  <div v-if="loading" class="container">
    <Loading text="Загрузка статьи"/>
  </div>

  <div v-else-if="article" class="article-page">
    <!-- Banner for article title, action buttons -->
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

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


          <!-- Если текущий пользователь является автором, покажите кнопки редактирования/удаления -->
          <span v-if="isAuthor">
            <RouterLink
                :to="{name: 'editArticle', params: {slug: article.slug}}"
                class="btn btn-outline-secondary btn-sm"
            >
              Редактировать статью
            </RouterLink>

            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
              Удалить статью
            </button>
          </span>

          <!-- Otherwise, show favorite & follow buttons -->
          <span v-if="!isAuthor">
            <button
                class="btn btn-sm action-btn ng-binding btn-secondary"
                ng-class="{ 'disabled': $ctrl.isSubmitting,
              'btn-outline-secondary': !$ctrl.user.following,
              'btn-secondary': $ctrl.user.following }"
                ng-click="$ctrl.submit()"
            >
  <i class="ion-plus-round"></i>
  &nbsp;
  Unfollow Gerome
</button>
  </span>

        </div>

      </div>
    </div>

    <div class="container page">
      <!-- HTML и теги статьи отображаются здесь -->
      <div class="row article-content">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>

          <!-- Вывод тегов -->
          <TagList :tags="article.tagList"/>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    Статьи с названием {{ slug }} не существует
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';
import {useArticleStore} from '../stores/article.store';
import {useAuthStore} from '../stores/auth.store';
import {RouterLink, useRouter} from 'vue-router';
import Loading from '../components/Loading.vue';
import TagList from '../components/TagList.vue';
import {IFeedArticles} from '../types/feed.types';

//
const props = defineProps<{
  slug: string
}>();

//
const articleStore = useArticleStore();
const authStore = useAuthStore();
const router = useRouter();
const article = ref({} as IFeedArticles);
const loading = ref(true);

//
const isAuthor = computed(() => article.value.author.username === authStore.getCurrentUser?.username);

//
const deleteArticle = async () => {
  try {
    await articleStore.deleteArticle(props.slug);
    router.push({name: 'home'});
  } catch (error) {
  }
};

//
onMounted(async () => {
  try {
    article.value = await articleStore.getArticle(props.slug);
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>

</style>
