<template>
  <router-link
    :to="`/module/${id}`"
    class="background rounded-lg flex justify-between p-2 px-5 block cursor-pointer mb-2"
  >
    <div>
      <h3 class="text-sm font-bold">{{ name }}</h3>
      <span class="text-sm text-muted-foreground">{{ description }}</span>
    </div>
    <user-avatar class="mt-auto" :avatar-url="createdBy.avatar" />
  </router-link>
</template>

<script setup>
import UserAvatar from "../UserAvatar.vue";

const { name, description, id, createdBy } = defineProps({
  name: { type: String },
  description: { type: String },
  id: { type: String },
  createdBy: { type: Object },
});
console.log("createdBy", createdBy);
</script>
