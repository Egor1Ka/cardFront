<template>
  <section
    class="col-span-6 flex w-full flex-col items-center justify-center gap-4 px-4 py-16 md:px-8"
  >
    <div class="max-w-md border background rounded-xl p-3">
      <AppLogo class="mx-auto block" />
      <p class="mt-2 text-sm text-muted-foreground mb-4">
        Sign in to sync your cards across devices.
      </p>
      <div>
        <GoogleLoginButton />
      </div>
    </div>
  </section>
</template>

<script setup>
import AppLogo from "@/components/AppLogo.vue";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton.vue";
</script>
