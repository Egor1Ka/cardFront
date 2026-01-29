<template>
  <AvatarRoot
    class="inline-flex items-center justify-center rounded-full overflow-hidden bg-[color:var(--color-border)]"
    :style="sizeStyle"
  >
    <AvatarImage :src="avatarUrl" class="h-full w-full object-cover" />
    <AvatarFallback
      class="flex h-full w-full items-center justify-center text-xs font-semibold text-[color:var(--color-text)]"
      :delay-ms="100"
    >
      {{ fallbackText }}
    </AvatarFallback>
  </AvatarRoot>
</template>

<script setup>
import { computed } from "vue";
import { AvatarFallback, AvatarImage, AvatarRoot } from "reka-ui";

const props = defineProps({
  avatarUrl: { type: String, default: "" },
  size: {
    type: [Number, String],
    default: 36,
  },
  fallback: {
    type: String,
    default: "Avatar",
  },
});

const sizeValue =
  typeof props.size === "number" ? `${props.size}px` : props.size;

const sizeStyle = computed(() => ({
  width: sizeValue,
  height: sizeValue,
}));
</script>
