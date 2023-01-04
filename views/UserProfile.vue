<template>
  <div
      v-if="userProfile"
      class="profile-page"
  >
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">

            <img class="user-img" :src="userProfile.image">

            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>

            <button
                v-if="!isUser"
                class="btn btn-sm action-btn"
            >
              Подписаться на {{ userProfile.username }}
            </button>

            <RouterLink
                v-if="isUser"
                :to="{name: 'settings'}"
                class="btn btn-sm btn-outline-secondary action-btn"
            >
              Редактировать Настройки профиля
            </RouterLink>

          </div>
        </div>
      </div>
    </div>

    <!-- Вывод статей пользователя. Вывод избранных статей -->
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <RouterLink
                    :to="{name: 'userProfile', params: {slug: userProfile.username}}"
                    class="nav-link"
                >
                  Мои статьи
                </RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink
                    :to="{name: 'userProfileFavorites', params: {slug: userProfile.username}}"
                    class="nav-link"
                >
                  Избранные статьи
                </RouterLink>
              </li>
            </ul>
          </div>

          <Feed :api-url="apiUrl"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, watch} from 'vue';
import {RouterLink, useRoute} from 'vue-router';
import Feed from '../components/Feed.vue';
import {useAuthStore} from '../stores/auth.store';
import {useUserProfile} from '../stores/userProfile';
import {TypeUserProfile} from '../types/auth.types';

//
const props = defineProps<{
  slug: string
}>();

//
const authStore = useAuthStore();
const userProfileStore = useUserProfile();
const route = useRoute();

//
const userProfile = ref(null as TypeUserProfile | null);

//
const isUser = computed(() => authStore.getCurrentUser?.username === props.slug);
const apiUrl = computed(() => {
  const isFavorites = route.path.includes('favorites');

  return isFavorites
      ? `/articles?favorited=${props.slug}`
      : `/articles?author=${props.slug}`;
});

//
const getUserProfile = async () => userProfile.value = await userProfileStore.getUserProfile(props.slug);

//
onMounted(async () => {
  try {
    await getUserProfile();
  } catch (error) {
  }
});

//
watch(() => props.slug, value => {
  getUserProfile();
});
</script>

<style scoped>

</style>