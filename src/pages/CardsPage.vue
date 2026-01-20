<template>
  <div class="container mx-auto px-3 py-6">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-xl font-semibold">Cards</h1>
    </div>

    <div v-if="isPending" class="text-sm text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-sm text-red-500">
      {{ error.message }}
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="card in cards || []" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<script setup>
import serverFetch from "@/api/server";
import Card from "@/components/card/Card.vue";
import { useQuery } from "@tanstack/vue-query";

const {
  data: cards,
  error,
  isPending,
} = useQuery({
  queryKey: ["cards"],
  queryFn: () => serverFetch("/cards"),
});
</script>
