const baseUrl = import.meta.env.VITE_BASE_URL;
import {UtilsLocalStorage} from './utilsLocalStorage';

type TypeHeaders = RequestInit & { headers: { [key: string]: string } }

export const fetchRequest = async (url: RequestInfo, method: string = 'GET', data?: object) => {
    const token = UtilsLocalStorage.getLocalStorage('token');
    const authorizationToken = token ? `Token ${token}` : '';

    const options: TypeHeaders = {
        method,
        headers: {authorization: authorizationToken},
    };

    if (data) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const res = await fetch(`${baseUrl}${url}`, options);

        if (!res.ok) {
            throw await res.json();
        }

        if (res.status === 204) {
            return true;
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
};