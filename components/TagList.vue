<template>
  <ul class="tag-list">
    <li
        v-for="tag in tags"
        :key="tag"
        class="tag-default tag-pill tag-outline"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  tags: string[]
}>();
</script>

<style scoped>

</style>