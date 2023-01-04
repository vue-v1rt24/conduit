<template>
  <nav>
    <ul class="pagination">
      <li
          v-for="page in pages"
          :key="page"
          :class="['page-item', {active: page === currentPage}]"
      >
        <RouterLink
            :to="{path: url, query: {page: page}}"
            class="page-link"
        >{{ page }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {RouterLink} from 'vue-router';
import {range} from '../utils/utilsNumericRange';

//
const props = defineProps<{
  total: number
  limit: number
  currentPage: number
  url: string
}>();

//
const pages = computed(() => {
  const pageCount = Math.ceil(props.total / props.limit);

  return range(pageCount, 1);
});
</script>

<style scoped>

</style>