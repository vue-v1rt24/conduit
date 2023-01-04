<template>
  <button :class="['btn btn-sm', classActiveFavorite]" @click="favoriteHandler">
    <span>{{ favoritesCountLocal }}</span>
  </button>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {useAddToFavoritesStore} from '../stores/addToFavorites.store';

const props = defineProps<{
  isFavorited: boolean
  favoritesCount: number
  articleSlug: string
}>();

//
const store = useAddToFavoritesStore();

//
const isFavoritedLocal = ref<boolean>(props.isFavorited);
const favoritesCountLocal = ref<number>(props.favoritesCount);

//
const classActiveFavorite = computed(() => ({
  'btn-primary': isFavoritedLocal.value,
  'btn-outline-primary': !isFavoritedLocal.value,
}));

//
const favoriteHandler = () => {
  isFavoritedLocal.value ? favoritesCountLocal.value-- : favoritesCountLocal.value++;

  store.addRemoveToFavorite(props.articleSlug, isFavoritedLocal.value);

  isFavoritedLocal.value = !isFavoritedLocal.value;
};
</script>

<style scoped>

</style>
