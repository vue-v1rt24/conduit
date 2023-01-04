<template>
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center ng-binding">Войти</h1>
        <p class="text-xs-center">
          <RouterLink :to="{name: 'register'}">Нужна учетная запись?</RouterLink>
        </p>

        <UIMessage/>

        <form @submit.prevent="loginHandler" class="ng-pristine ng-valid ng-valid-email">
          <fieldset>
            <fieldset class="form-group">
              <input
                  v-model="formFields.email"
                  class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty ng-valid-email"
                  type="email"
                  placeholder="Почта"
              >
            </fieldset>

            <fieldset class="form-group">
              <input
                  v-model="formFields.password"
                  class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty"
                  type="password"
                  placeholder="Пароль"
              >
            </fieldset>

            <button class="btn btn-lg btn-primary pull-xs-right ng-binding" type="submit" :disabled="isSubmit">
              Войти
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive} from 'vue';
import {RouterLink, useRouter} from 'vue-router';
import {useAuthStore} from '../stores/auth.store';
import UIMessage from '../components/UI/UIMessage.vue';

const router = useRouter();
const store = useAuthStore();

const formFields = reactive({
  email: 'w@w.ww',
  password: '111',
});

const isSubmit = ref(false);

//
const loginHandler = async () => {
  try {
    isSubmit.value = true;
    await store.login(formFields);
    router.push({name: 'home'});
  } catch (error) {
  } finally {
    isSubmit.value = false;
  }
};
</script>

<style scoped>

</style>