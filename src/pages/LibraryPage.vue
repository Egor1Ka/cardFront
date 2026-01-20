<template>
  <div class="container mx-auto px-3 py-6">
    <h1 class="text-2xl font-semibold">Библиотека</h1>

    <TabsRoot class="mt-6" :value="activeTab">
      <TabsList
        class="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1"
      >
        <TabsTrigger as-child value="container">
          <router-link
            class="tab-link"
            :class="activeTab === 'container' ? 'is-active' : ''"
            to="/createCards"
          >
            Создание контейнера
          </router-link>
        </TabsTrigger>
        <TabsTrigger as-child value="cards">
          <router-link
            class="tab-link"
            :class="activeTab === 'cards' ? 'is-active' : ''"
            to="/cards"
          >
            Создание карточек
          </router-link>
        </TabsTrigger>
      </TabsList>
    </TabsRoot>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { TabsList, TabsRoot, TabsTrigger } from "reka-ui";

const route = useRoute();

const activeTab = computed(() => {
  if (route.path === "/cards") return "cards";
  return "container";
});
</script>

<style scoped>
.tab-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  transition: background 0.2s ease, color 0.2s ease;
}

.tab-link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.95);
}

.tab-link.is-active {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}
</style>
