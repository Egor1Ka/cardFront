import { computed, ref } from "vue";
import { readItem, saveItem } from "@/helpers/localstorage";

export const useLocalStorage = (key, defaultValue = null) => {
  const stored = ref(readItem(key)(defaultValue));
  const write = saveItem(key);

  return computed({
    get: () => stored.value,
    set: (value) => {
      stored.value = value;
      write(value);
    },
  });
};
