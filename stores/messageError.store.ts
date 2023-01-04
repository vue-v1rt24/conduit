import {ref, computed} from 'vue';
import {defineStore} from 'pinia';

export const useMessageErrorStore = defineStore('messageError', () => {
    const message = ref(null);

    //
    const getMessage = computed(() => message.value);

    //
    const setMessage = (mes: any) => message.value = mes.errors;

    const clearMessage = () => message.value = null;

    return {
        message,
        getMessage,
        setMessage,
        clearMessage,
    };
});