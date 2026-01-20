<template>
  <span
    class="inline-block px-2 py-1 text-sm text-white bg-blue-600 rounded-t-lg"
  >
    {{ props.text }}
  </span>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>
