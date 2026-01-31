<template>
  <slot />
</template>

<script setup>
import { onMounted, provide, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { authStore } from "@/stores/authStore";

const auth = authStore();
provide("auth", auth);

const router = useRouter();
const route = useRoute();

onMounted(() => {
  auth.fetchUser();
});

watch([auth.loading, auth.user], ([isLoading, currentUser]) => {
  if (isLoading) return;

  if (!currentUser && route.name !== "login") {
    router.replace({ name: "login" });
    return;
  }

  if (currentUser && route.name === "login") {
    router.replace({ name: "home" });
  }
});
</script>
