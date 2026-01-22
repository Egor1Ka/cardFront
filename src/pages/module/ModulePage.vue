<template>
  <div class="container container mx-auto px-3">
    <h1 class="mb-4">Module</h1>
    <div v-if="modulePending" class="text-sm text-gray-500">Loading...</div>
    <div v-else-if="moduleError" class="text-sm text-red-500">
      {{ moduleError.message }}
    </div>
    <div v-else>
      <h3>{{ moduleData?.name }}</h3>
      <span class="text-muted-foreground">{{ moduleData?.description }}</span>
    </div>

    <h2 class="mt-6 mb-3">Cards</h2>
    <div v-if="cardsPending" class="text-sm text-gray-500">Loading...</div>
    <div v-else-if="cardsError" class="text-sm text-red-500">
      {{ cardsError.message }}
    </div>
    <div v-else class="grid gap-3">
      <RowCard v-for="card in cards || []" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<script setup>
import serverFetch from "@/api/server";
import RowCard from "@/components/card/RowCard.vue";
import { useQuery } from "@tanstack/vue-query";
import { useRoute } from "vue-router";

const route = useRoute();
const { params } = route;
const { id } = params;

const {
  data: moduleData,
  error: moduleError,
  isPending: modulePending,
} = useQuery({
  queryKey: ["module", id],
  queryFn: () => serverFetch(`/module/${id}`),
});

const {
  data: cards,
  error: cardsError,
  isPending: cardsPending,
} = useQuery({
  queryKey: ["module-cards", id],
  queryFn: () => serverFetch(`/cards/module/${id}`),
});
</script>
