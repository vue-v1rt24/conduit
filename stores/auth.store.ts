import {ref, computed} from 'vue';
import {defineStore} from 'pinia';
import {fetchRequest} from '../utils/utilsFetchRequest';
import {IRegisterTypes, IUserResponseTypes, IUserUpdate} from '../types/auth.types';
import {useMessageErrorStore} from './messageError.store';
import {UtilsLocalStorage} from '../utils/utilsLocalStorage';

/*
* Вход в учётную запись:
* Почта: w@w.ww
* Пароль: 111
* */

export const useAuthStore = defineStore('auth', () => {
    const currentUser = ref<IUserResponseTypes | null>(null);
    const isLoggedIn = ref<boolean>(false);
    const isLoading = ref(false);

    //
    const getIsLoggedIn = computed(() => isLoggedIn.value);
    const getCurrentUser = computed(() => currentUser.value);

    //
    const register = async (userData: IRegisterTypes) => {
        try {
            const user = await fetchRequest('/users', 'POST', {user: userData});
            currentUser.value = user.user;
            isLoggedIn.value = true;
            UtilsLocalStorage.setLocalStorage('token', user.user.token);
            useMessageErrorStore().clearMessage();
        } catch (error) {
            useMessageErrorStore().setMessage(error);
            throw error;
        }
    };

    const login = async (userData: IRegisterTypes) => {
        try {
            const user = await fetchRequest('/users/login', 'POST', {user: userData});
            currentUser.value = user.user;
            isLoggedIn.value = true;
            UtilsLocalStorage.setLocalStorage('token', user.user.token);
            useMessageErrorStore().clearMessage();
        } catch (error) {
            useMessageErrorStore().setMessage(error);
            throw error;
        }
    };

    const getCurrentUserAuth = async () => {
        try {
            isLoading.value = true;
            const user = await fetchRequest('/user');
            currentUser.value = user.user;
            isLoggedIn.value = true;
        } catch (error) {
            logout();
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const updateCurrentUser = async (user: IUserUpdate) => {
        try {
            const userData = await fetchRequest('/user', 'PUT', {user});
            currentUser.value = userData.user;
            useMessageErrorStore().clearMessage();
        } catch (error) {
            useMessageErrorStore().setMessage(error);
            throw error;
        }
    };

    const logout = () => {
        currentUser.value = null;
        isLoggedIn.value = false;
        UtilsLocalStorage.removeLocalStorage('token');
    };

    return {
        currentUser,
        isLoggedIn,
        getIsLoggedIn,
        getCurrentUser,
        register,
        login,
        getCurrentUserAuth,
        updateCurrentUser,
        logout,
    };
});