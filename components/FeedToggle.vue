<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">

      <li class="nav-item" v-if="isAuth">
        <RouterLink
            :to="{name: 'yourFeed'}"
            class="nav-link"
        >
          Ваш Выбор
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink
            :to="{name: 'home'}"
            class="nav-link"
        >
          Общий выбор
        </RouterLink>
      </li>

      <li class="nav-item" v-if="tagName">
        <RouterLink
            custom
            :to="{name: 'tag'}"
            v-slot="{ href, isActive }"
        >
          <a
              :href="href"
              :class="['nav-link', isActive && 'active']"
          ># {{ tagName }}</a>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useAuthStore} from '../stores/auth.store';
import {RouterLink} from 'vue-router';

const props = defineProps<{
  tagName?: string
}>();

const store = useAuthStore();

const isAuth = computed(() => store.getIsLoggedIn);
</script>

<style scoped>

</style>