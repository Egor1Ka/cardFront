<template>
  <Primitive
    as="button"
    :type="type"
    :class="[
      'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium',
      'transition-all cursor-pointer outline-none',
      'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
      'focus-visible:ring-2 focus-visible:ring-[color:var(--color-border)]',
      'bg-[color:var(--color-text)] text-[color:var(--color-background)]',
      'hover:opacity-75',
      'rounded-md p-2',
      customClass,
    ]"
  >
    <span v-if="slots.icon" class="inline-flex items-center">
      <slot name="icon" />
    </span>
    <slot />
  </Primitive>
</template>

<script setup>
import { useSlots } from "vue";
import { Primitive } from "reka-ui";

const slots = useSlots();

defineProps({
  type: {
    type: String,
    default: "button",
  },
  customClass: {
    type: String,
    default: "",
  },
});
</script>
