<template>
  <div class="container container mx-auto px-3">
    <h1 class="mb-4">Create Module</h1>
    <CardsNavigation />
    <CreateModule />
  </div>
</template>

<script setup lang="ts">
import CardsNavigation from "@/components/CardsNavigation.vue";
import CreateModule from "@/components/createModule.vue";
</script>
