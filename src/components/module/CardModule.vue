<template>
  <router-link
    :to="`/module/${id}`"
    class="background rounded-lg p-2 px-5 block cursor-pointer mb-2"
  >
    <h3 class="text-sm font-bold">{{ name }}</h3>
    <span class="text-sm text-muted-foreground">{{ description }}</span>
  </router-link>
</template>

<script setup>
const { name, description } = defineProps({
  name: { type: String },
  description: { type: String },
  id: { type: String },
});
</script>
