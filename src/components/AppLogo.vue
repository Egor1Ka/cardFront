<template>
  <img
    class="rounded-xl"
    :src="logoSrc"
    :style="{
      width: resolvedSize,
      height: resolvedSize,
    }"
  />
</template>

<script setup>
import { computed } from "vue";
import logoSrc from "@/assets/img/logo.png";

const props = defineProps({
  size: {
    type: [Number, String],
    default: 48,
  },
});

const resolvedSize = computed(() =>
  typeof props.size === "number" ? `${props.size}px` : props.size,
);
</script>
