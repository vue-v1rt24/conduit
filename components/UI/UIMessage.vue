<template>
  <ul v-if="errorsValid" class="error-messages">
    <template v-for="(errors, field) in errorsValid" :key="field">
      <li
          v-for="error in errors"
          :key="error"
          class="ng-binding ng-scope"
      >
        {{ field }} {{ messageErrors(error) }}
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {useMessageErrorStore} from '../../stores/messageError.store';
import {messageErrors} from '../../utils/utilsMessageErrors';

const store = useMessageErrorStore();

const errorsValid = computed(() => store.getMessage);
</script>

<style scoped>

</style>