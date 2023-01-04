<template>
  <TopBar/>
  <main>
    <RouterView/>
  </main>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router';
import TopBar from '../components/TopBar.vue';
</script>

<style scoped>

</style>