<template>
  <div class="container container mx-auto px-3">
    <h1 class="mb-4">Modules</h1>
    <CardsNavigation />
    <CardModule
      v-for="module in modules"
      :name="module.name"
      :description="module.description"
      :id="module.id"
      :created-by="module.createdBy"
    />
  </div>
</template>

<script setup lang="ts">
import serverFetch from "@/api/server";
import CardsNavigation from "@/components/CardsNavigation.vue";
import CardModule from "@/components/module/CardModule.vue";
import { useQuery } from "@tanstack/vue-query";

const { data: modules } = useQuery({
  queryKey: ["modules"],
  queryFn: () => serverFetch("/module"),
});
</script>
