<template>
  <TabsRoot :value="activeTab" class="mb-2 w-fit">
    <TabsList class="flex gap-2 border p-1 px-3 rounded-full">
      <TabsTrigger v-for="tab in tabs" :key="tab.link" :value="tab.link">
        <router-link
          class="p-2 flex items-center gap-2 justify-center rounded-full"
          :class="activeTab === tab.link ? activeTabClass : 'hover'"
          :to="tab.link"
        >
          <fa :icon="tab.icon" class="text-current" />
          {{ tab.title }}
        </router-link>
      </TabsTrigger>
    </TabsList>
  </TabsRoot>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { TabsList, TabsRoot, TabsTrigger } from "reka-ui";

const tabs = [
  { link: "/createModule", title: "Create Module", icon: "square-plus" },
  { link: "/module", title: "Modules", icon: "layer-group" },
  { link: "/cards", title: "My Cards", icon: "id-card" },
];
const route = useRoute();

const activeTab = computed(() => {
  return route.path;
});

const activeTabClass =
  "rounded-3xl font-bold bg-[var(--vt-c-white-soft)] dark:bg-[var(--vt-c-black-soft)] text-[var(--vt-c-text-dark-1)] dark:text-[var(--vt-c-text-light-1)]";
</script>
