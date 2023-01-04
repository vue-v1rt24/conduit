<template>
  <div class="container page">
    <div class="row">
      <div class="col-md-10 offset-md-1 col-xs-12">

        <UIMessage/>

        <form @submit.prevent="formHandler">
          <fieldset class="form-group">
            <input
                v-model="fields.title"
                class="form-control form-control-lg"
                type="text"
                placeholder="Заголовок статьи"
            >
          </fieldset>

          <fieldset class="form-group">
            <input
                v-model="fields.description"
                class="form-control"
                type="text"
                placeholder="О чём эта статья?"
            >
          </fieldset>

          <fieldset class="form-group">
            <textarea
                v-model="fields.body"
                class="form-control"
                rows="8"
                placeholder="Напишите свою статью"
            ></textarea>
          </fieldset>

          <fieldset class="form-group">
            <input
                v-model="fields.tagField"
                class="form-control"
                type="text"
                placeholder="Теги статьи через запятую"
            >

            <div class="tag-list"></div>
          </fieldset>

          <button class="btn btn-lg pull-xs-right btn-primary" type="submit" :disabled="loading">
            Опубликовать статью
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue';
import UIMessage from './UI/UIMessage.vue';
import {TagListType, IArticlesFormTypes} from '../types/articles.types';

//
const props = defineProps<{
  values?: IArticlesFormTypes
  loading: boolean
}>();

//
const emit = defineEmits<{
  (e: 'formHandler', val: IArticlesFormTypes): IArticlesFormTypes
}>();

//
const fields = reactive({
  title: props.values?.title || '',
  description: props.values?.description || '',
  body: props.values?.body || '',
  tagList: (props.values?.tagList as string[])?.join('') || '' as TagListType,
});

//
const formHandler = () => {
  emit('formHandler', {...fields, tagList: (fields.tagList as string).split(',')});
};
</script>

<style scoped>

</style>