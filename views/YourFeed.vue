<template>
  <div class="home-page ng-scope">
    <!-- Баннер-заставка, который отображается для неавторизованных пользователей -->
    <Banner/>

    <!-- -->
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <!-- Ссылки -->
          <FeedToggle/>

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
import {ref} from 'vue';
import Banner from '../components/Banner.vue';
import FeedToggle from '../components/FeedToggle.vue';
import Feed from '../components/Feed.vue';
import PopularTags from '../components/PopularTags.vue';

const apiUrl = ref('/articles/feed');
</script>

<style scoped>

</style>