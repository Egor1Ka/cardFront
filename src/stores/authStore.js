import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import serverFetch from "@/api/server";

const user = ref(null);

const setUser = (value) => (user.value = value);

const fetchUser = async () => {
  const profile = await serverFetch("/user/profile");
  setUser(profile);
  return profile;
};

export const authStore = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: false,
    retry: false,
  });

  return {
    user,
    setUser,
    fetchUser: query.refetch,
    loading: computed(() => query.isFetching.value),
    error: computed(() => query.error.value),
  };
};
