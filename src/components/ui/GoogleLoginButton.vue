<template>
  <button
    class="google-login-button border inline-flex hover w-full items-center justify-center gap-3 rounded p-3 text-sm font-semibold cursor-pointer"
    type="button"
    @click="loginWithGoogle"
  >
    <img
      :src="googleIcon"
      alt=""
      class="google-icon rounded-full bg-white p-0.5"
    />
    <slot>Continue with Google</slot>
  </button>
</template>

<script setup>
import googleIcon from "@/assets/svg/google-icon-logo-svgrepo-com.svg";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:9000";

const loginWithGoogle = () => {
  window.location.href = `${BACKEND_URL}/auth/google`;
};
</script>

<style scoped>
.google-icon {
  width: 20px;
  height: 20px;
  display: block;
}
</style>
