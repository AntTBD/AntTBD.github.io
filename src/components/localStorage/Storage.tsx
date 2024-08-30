export function setStorage(key:string, value:string) {
    localStorage.setItem(key, value);
}
interface DefaultStorageMap {
    [key: string]: string | undefined
}
export function getStorage(key:string) {
    const defaults : DefaultStorageMap = {
        theme: 'bootstrap',//"dark"
        // language: 'en',
    }

    const defaultValue = defaults[key] || null;

    const itemValue = localStorage.getItem(key);
    if (itemValue == null && defaultValue != null) {
        setStorage(key, defaultValue);
        return defaultValue;
    }

    return itemValue;
}