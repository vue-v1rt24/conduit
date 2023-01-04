<template>
  <div class="home-page ng-scope">
    <!-- Баннер-заставка, который отображается для неавторизованных пользователей -->
    <Banner/>

    <!-- -->
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <!-- Ссылки -->
          <FeedToggle :tag-name="slug"/>

          <!-- Вывод статей -->
          <Feed :api-url="apiUrl"/>
        </div>

        <!-- Вывод тегов -->
        <div class="col-md-3">
          <PopularTags/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import Banner from '../components/Banner.vue';
import Feed from '../components/Feed.vue';
import PopularTags from '../components/PopularTags.vue';
import FeedToggle from '../components/FeedToggle.vue';

const props = defineProps<{
  slug: string
}>();

const apiUrl = computed(() => `/articles?tag=${props.slug}`);
</script>

<style scoped>

</style>