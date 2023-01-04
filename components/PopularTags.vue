<template>
  <div class="sidebar">
    <p>Популярные теги</p>

    <Loading v-if="loading" text="Загрузка тегов..."/>

    <div class="tag-list" v-else-if="tags.length">
      <RouterLink
          v-for="tag in tags"
          :key="tag"
          :to="{name: 'tag', params: {slug: tag}}"
          class="tag-default tag-pill"
      >
        {{ tag }}
      </RouterLink>
    </div>

    <div class="post-preview" v-else>
      Тегов нет
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import {usePopularTagsStore} from '../stores/popularTags.store';
import {RouterLink} from 'vue-router';
import Loading from './Loading.vue'

//
const loading = ref(true);
const store = usePopularTagsStore();
const tags = ref<string[]>([]);

//
onMounted(async () => {
  try {
    tags.value = await store.getTags();
  } catch (error) {
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>

</style>