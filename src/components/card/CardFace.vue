<template>
  <div
    class="flex h-full w-full items-center p-3"
    :class="props.img ? 'justify-between gap-4' : 'justify-center'"
  >
    <div v-if="props?.img?.url" class="flex-1 h-full">
      <img
        class="h-full w-full rounded-lg object-cover"
        :src="props.img.url"
        :alt="props.img.alt"
      />
    </div>
    <div
      :class="
        props.img
          ? 'flex-1 flex h-full items-center justify-center'
          : 'w-full flex h-full items-center justify-center'
      "
    >
      <div class="text-center">
        <h3 class="font-bold">{{ props.text }}</h3>
        <p class="text-sm text-muted-foreground">{{ props.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  img: {
    type: Object,
    default: null,
  },
});
</script>
