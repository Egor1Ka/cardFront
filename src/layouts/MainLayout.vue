<template>
  <div class="min-h-screen flex">
    <aside
      :class="[
        'h-screen sticky top-0 shrink-0 hidden flex-col transition-all duration-300 ease-in-out lg:flex background overflow-y-auto',
        sidebarOpen ? 'w-40' : 'w-16',
      ]"
    >
      <div class="flex items-center justify-between px-4 py-4">
        <button
          class="inline-flex items-center justify-center h-9 w-9 rounded-md cursor-pointer transition-colors"
          type="button"
          @click="sidebarOpen = !sidebarOpen"
        >
          <fa icon="bars" />
        </button>
        <div v-if="sidebarOpen" class="flex items-center gap-2">
          <AppLogo />
        </div>
      </div>

      <nav class="mt-2 flex flex-col gap-2 px-2">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover',
            isActive(item.to) ? 'bg-[color:var(--color-border-hover)]' : '',
          ]"
        >
          <fa :icon="item.icon" />
          <span v-if="sidebarOpen" class="text-sm font-bold">
            {{ item.label }}
          </span>
        </router-link>
      </nav>

      <div
        class="mt-auto px-4 py-4 flex items-center gap-1"
        v-if="user && !loading"
      >
        <user-avatar :avatarUrl="user.avatar" />
        <p v-if="sidebarOpen" class="text-sm">{{ user.name }}</p>
      </div>
    </aside>

    <main class="flex-1 px-4 py-4">
      <div class="mb-4 flex lg:hidden">
        <button
          class="inline-flex items-center justify-center h-10 w-10 rounded-md cursor-pointer transition-colors hover:bg-[color:var(--color-border-hover)]"
          type="button"
          @click="mobileOpen = true"
        >
          <fa icon="bars" />
        </button>
      </div>
      <router-view />
    </main>

    <DialogRoot v-model:open="mobileOpen">
      <DialogPortal>
        <DialogOverlay class="fixed inset-0 bg-black/60" />
        <DialogContent
          class="fixed inset-y-0 left-0 w-64 h-screen flex flex-col shadow-lg bg-[color:var(--color-text)] text-[color:var(--color-background)] overflow-y-auto"
        >
          <div class="flex items-center justify-between px-4 py-4">
            <span class="text-lg font-semibold tracking-wide">CardFront</span>
            <DialogClose
              class="inline-flex items-center justify-center h-9 w-9 rounded-md cursor-pointer transition-colors hover:bg-[color:var(--color-border-hover)]"
            >
              <fa icon="xmark" />
            </DialogClose>
          </div>

          <nav class="mt-2 flex flex-col gap-2 px-2">
            <router-link
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              :class="[
                'flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-[color:var(--color-border-hover)]',
                isActive(item.to) ? 'bg-[color:var(--color-border-hover)]' : '',
              ]"
              @click="mobileOpen = false"
            >
              <fa :icon="item.icon" />
              <span class="text-sm font-bold">
                {{ item.label }}
              </span>
            </router-link>
          </nav>

          <div
            class="mt-auto px-4 py-4 flex items-center gap-1"
            v-if="user && !loading"
          >
            <user-avatar :avatarUrl="user.avatar" />
            <p v-if="sidebarOpen" class="text-sm">{{ user.name }}</p>
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </div>
</template>

<script setup>
import { useAuth } from "@/composables/useAuth";
import { useSidebar } from "@/composables/useSidebar";
import { ref } from "vue";
import { useRoute } from "vue-router";
import UserAvatar from "@/components/UserAvatar.vue";
import AppLogo from "@/components/AppLogo.vue";
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogClose,
} from "reka-ui";

const { user, loading } = useAuth();

const route = useRoute();
const { sidebarOpen } = useSidebar();
const mobileOpen = ref(false);

const navItems = [
  { label: "Home", to: "/", icon: "house" },
  { label: "Library", to: "/library", icon: "folder" },
];

const isActive = (path) => route.path === path;
</script>
