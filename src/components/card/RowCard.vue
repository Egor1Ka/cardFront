<template>
  <div class="background rounded-xl p-4 shadow-md">
    <div class="flex items-center gap-4">
      <div class="flex min-w-0 flex-1 items-center gap-3">
        <img
          v-if="card.front?.img?.url"
          class="h-12 w-12 rounded-md object-cover"
          :src="card.front.img.url"
          :alt="card.front.img.alt || 'Front image'"
        />
        <div class="min-w-0">
          <div class="truncate font-semibold">{{ card.front?.text }}</div>
          <div class="text-sm text-muted-foreground">
            {{ card.front?.description }}
          </div>
        </div>
      </div>

      <div class="h-10 w-px bg-[var(--color-border)]"></div>

      <div class="flex min-w-0 flex-1 items-center gap-3">
        <img
          v-if="card.back?.img?.url"
          class="h-12 w-12 rounded-md object-cover"
          :src="card.back.img.url"
          :alt="card.back.img.alt || 'Back image'"
        />
        <div class="min-w-0">
          <div class="truncate font-semibold">{{ card.back?.text }}</div>
          <div class="truncate text-muted-foreground">
            {{ card.back?.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  card: {
    type: Object,
  },
});
</script>
