<template>
  <div v-if="currentUser" class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">

          <h1 class="text-xs-center">Ваши настройки</h1>

          <UIMessage/>

          <form @submit.prevent="userUpdateHandler">
            <fieldset>
              <fieldset class="form-group">
                <input
                    class="form-control"
                    type="text"
                    placeholder="URL-адрес изображения профиля"
                    v-model="formData.image"
                >
              </fieldset>

              <fieldset class="form-group">
                <input
                    class="form-control form-control-lg"
                    type="text"
                    placeholder="Имя пользователя"
                    v-model="formData.username"
                >
              </fieldset>

              <fieldset class="form-group">
                <textarea
                    class="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty"
                    rows="8"
                    placeholder="Краткая биография о вас"
                    v-model="formData.bio"
                ></textarea>
              </fieldset>

              <fieldset class="form-group">
                <input
                    class="form-control form-control-lg"
                    type="email"
                    placeholder="Почта"
                    v-model="formData.email"
                >
              </fieldset>

              <fieldset class="form-group">
                <input
                    class="form-control form-control-lg"
                    type="password"
                    placeholder="Новый пароль"
                    v-model="formData.password"
                >
              </fieldset>

              <button
                  class="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  :disabled="isSubmit"
              >
                Обновить настройки
              </button>
            </fieldset>
          </form>

          <hr>

          <button
              type="button"
              class="btn btn-outline-danger"
              @click="logout"
          >
            Или нажмите здесь, чтобы выйти из системы.
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {useAuthStore} from '../stores/auth.store';
import {useRouter} from 'vue-router';
import UIMessage from '../components/UI/UIMessage.vue';
import {IUserUpdate} from '../types/auth.types';

//
const store = useAuthStore();
const router = useRouter();
const isSubmit = ref(false);

//
const currentUser = computed(() => store.getCurrentUser);

const formData = computed<IUserUpdate>(() => {
  return {
    image: currentUser.value!.image,
    username: currentUser.value!.username,
    bio: currentUser.value!.bio,
    email: currentUser.value!.email,
    password: '',
  };
});

//
const userUpdateHandler = async () => {
  try {
    isSubmit.value = true;
    await store.updateCurrentUser(formData.value);
  } catch (error) {
  } finally {
    isSubmit.value = false;
  }
};

const logout = () => {
  store.logout();
  router.push({name: 'home'});
};
</script>

<style scoped>

</style>