import { computed, ref } from "vue";
import serverFetch from "@/api/server";

const user = ref(null);
const loading = ref(false);
const error = ref(null);

let initPromise = null;

const loadUser = async () => {
  loading.value = true;
  error.value = null;
  try {
    user.value = await serverFetch("/user/profile");
  } catch (err) {
    error.value = err;
    user.value = null;
  } finally {
    loading.value = false;
  }
};

export const useAuth = () => {
  return {
    user,
    loading,
    error,
    hasUser: computed(() => Boolean(user.value)),
    getUser: async () => {
      if (user.value) return user.value;
      if (!initPromise) {
        initPromise = loadUser().finally(() => {
          initPromise = null;
        });
      }
      await initPromise;
      return user.value;
    },
  };
};
