<template>
  <div
      v-if="!isAuth"
      class="banner"
  >
    <div class="container">
      <h1 class="logo-font ng-binding">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useAuthStore} from '../stores/auth.store';

const store = useAuthStore();

const isAuth = computed(() => store.getIsLoggedIn);
</script>

<style scoped>

</style>