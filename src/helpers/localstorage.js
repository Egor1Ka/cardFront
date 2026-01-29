import { ref, watch } from "vue";

const saveItem = (key) => (value) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
};

const readItem = (key) => (defaultValue) => {
  if (typeof localStorage === "undefined") return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? defaultValue : JSON.parse(raw);
  } catch (e) {
    return defaultValue;
  }
};

const useLocalStorageRead = (key, defaultValue = null) => {
  const value = ref(readItem(key)(defaultValue));
  return value;
};

const useLocalStorageWrite = (key, initialValue = null) => {
  const value = ref(initialValue);

  watch(
    value,
    (nextValue) => {
      if (typeof localStorage === "undefined") return;
      if (nextValue === undefined) {
        localStorage.removeItem(key);
        return;
      }
      localStorage.setItem(key, JSON.stringify(nextValue));
    },
    { deep: true },
  );

  return value;
};

const config = {
  saveItem,
  readItem,
  useLocalStorageRead,
  useLocalStorageWrite,
};

export { saveItem, readItem, useLocalStorageRead, useLocalStorageWrite };
export default config;
