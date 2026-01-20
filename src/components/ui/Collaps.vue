<template>
  <CollapsibleRoot v-model:open="isOpen">
    <CollapsibleTrigger class="flex items-center gap-1 text-sm cursor-pointer">
      <slot name="triger" />
      <slot v-if="slots['triger-icon']" name="triger-icon" />
      <fa
        v-else
        :icon="isOpen ? 'chevron-up' : 'chevron-down'"
        class="text-gray-500"
      />
    </CollapsibleTrigger>

    <CollapsibleContent
      :class="[
        'overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp',
        contentClass,
      ]"
    >
      <slot name="content" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<script setup>
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
} from "reka-ui";
import { useSlots } from "vue";

const isOpen = defineModel("isOpen");
const slots = useSlots();

defineProps({
  contentClass: {
    type: String,
    default: "",
  },
});
</script>
