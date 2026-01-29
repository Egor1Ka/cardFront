import { computed, onMounted, ref } from "vue";
import serverFetch from "@/api/server";

const user = ref(null);
const loading = ref(false);
const error = ref(null);

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
  onMounted(() => {
    if (!user.value && !loading.value) {
      loadUser();
    }
  });

  return {
    user,
    loading,
    error,
    hasUser: computed(() => Boolean(user.value)),
  };
};
