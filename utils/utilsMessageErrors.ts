import {TypeMessageErrorsTypes} from '../types/messageErrors.types';

const codeErrors = {
    'has already been taken': 'уже занят',
    'can\'t be blank': 'заполните поле',
    'is invalid': 'неверны',
};

export const messageErrors = (code: TypeMessageErrorsTypes) => codeErrors?.[code] ? codeErrors[code] : 'неопределённая ошибка';