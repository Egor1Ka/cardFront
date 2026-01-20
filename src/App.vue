<template>
  <div class="min-h-screen flex bg-[color:var(--color-background)]">
    <aside
      :class="[
        'sidebar min-h-screen transition-all duration-300 ease-in-out',
        'shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)]',
        sidebarOpen ? 'w-60' : 'w-16',
      ]"
    >
      <div class="flex items-center justify-between px-4 py-4">
        <button
          class="sidebar-item inline-flex items-center justify-center h-9 w-9 rounded-md cursor-pointer"
          type="button"
          @click="sidebarOpen = !sidebarOpen"
        >
          <fa icon="bars" />
        </button>
        <span v-if="sidebarOpen" class="text-lg font-semibold tracking-wide">
          CardFront
        </span>
      </div>

      <nav class="mt-2 flex flex-col gap-2 px-2">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'sidebar-item flex items-center gap-3 rounded-xl px-3 py-2 transition-colors',
            isActive(item.to) ? 'is-active' : '',
          ]"
        >
          <fa :icon="item.icon" />
          <span v-if="sidebarOpen" class="text-sm font-bold">
            {{ item.label }}
          </span>
        </router-link>
      </nav>
    </aside>

    <main class="flex-1 px-4 py-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const sidebarOpen = ref(true);

const navItems = [
  { label: "Home", to: "/", icon: "house" },
  { label: "Library", to: "/library", icon: "folder" },
];

const isActive = (path) => route.path === path;
</script>

<style scoped>
.sidebar {
  background: var(--vt-c-black);
  color: var(--vt-c-white);
}

.sidebar-item:hover,
.sidebar-item.is-active {
  background: rgba(255, 255, 255, 0.1);
}

:global(html[data-theme="dark"]) .sidebar,
:global(body[data-theme="dark"]) .sidebar {
  background: var(--vt-c-white);
  color: var(--vt-c-black);
}

:global(html[data-theme="dark"]) .sidebar-item:hover,
:global(html[data-theme="dark"]) .sidebar-item.is-active,
:global(body[data-theme="dark"]) .sidebar-item:hover,
:global(body[data-theme="dark"]) .sidebar-item.is-active {
  background: rgba(0, 0, 0, 0.08);
}
</style>
