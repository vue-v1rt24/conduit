<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <RouterLink :to="{name: 'home'}" class="navbar-brand ng-binding">
        conduit
      </RouterLink>

      <!-- Для не авторизованных пользователей -->
      <ul v-if="!isLoggedIn" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <RouterLink :to="{name: 'home'}" class="nav-link">
            Главная
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink :to="{name: 'login'}" class="nav-link">
            Войти
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink :to="{name: 'register'}" class="nav-link">
            Регистрация
          </RouterLink>
        </li>
      </ul>

      <!-- Для авторизованных пользователей -->
      <ul v-if="isLoggedIn" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <RouterLink :to="{name: 'home'}" class="nav-link">
            Главная
          </RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink :to="{name: 'createArticle'}" class="nav-link">
            Новая статья
          </RouterLink>
        </li>

        <li class="nav-item">
          <router-link :to="{name: 'settings'}" class="nav-link">
            Настройки
          </router-link>
        </li>

        <li class="nav-item">
          <RouterLink
              :to="{name: 'userProfile', params: {slug: currentUser.username}}"
              :class="['nav-link', isActive && 'active']"
          >
            {{ currentUser.username }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useAuthStore} from '../stores/auth.store';
import {useUserProfile} from '../stores/userProfile';
import {RouterLink, useRoute} from 'vue-router';

const store = useAuthStore();
const userProfileStore = useUserProfile();
const route = useRoute();

//
const currentUser = computed(() => store.getCurrentUser);
const isLoggedIn = computed(() => store.getIsLoggedIn);
const isActive = computed(() => route.path.includes('profile') && (currentUser.value?.username === userProfileStore.getUserCurrentProfile?.username));
</script>

<style scoped>

</style>