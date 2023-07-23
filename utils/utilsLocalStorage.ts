export class UtilsLocalStorage {
    static getLocalStorage(key: string) {
        if (!key) return;

        return JSON.parse(localStorage.getItem(key)!) || null;
        // return JSON.parse(localStorage.getItem(key)!) || [];
        // return JSON.parse(localStorage.getItem(key)!);
    }

    static setLocalStorage(key: string, data: any) {
        if (!key && !data) return;

        localStorage.setItem(key, JSON.stringify(data));
    }

    static removeLocalStorage(key: string) {
        if (!key) return;

        localStorage.removeItem(key);
    }
}
