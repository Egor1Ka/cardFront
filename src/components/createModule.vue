<template>
  <form @submit.prevent="onSubmit">
    <div>
      <Input id="name" label="Name" placeholder="Enter name" v-model="name" />
      <Input
        id="description"
        label="Description"
        placeholder="Enter description"
        class="mb-3"
        v-model="description"
      />
    </div>

    <CardFields
      v-for="(card, index) in cards"
      :key="card.id"
      :id-prefix="`card-${index + 1}`"
      v-model:front="card.front"
      v-model:back="card.back"
      @delete="deleteCard(card.id)"
    />

    <div class="flex justify-center">
      <Button @click="addCard">
        <template #icon>
          <fa icon="plus" />
        </template>
        <span class="text-sm font-bold"> Add Card</span>
      </Button>
    </div>
    <div v-if="isPending" class="text-sm text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-sm text-red-500">
      {{ error.message }}
    </div>
    <Button type="submit">Submit</Button>
  </form>
</template>

<script setup>
import CardFields from "@/components/card/CardFields.vue";
import Input from "./ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import { ref } from "vue";
import serverFetch from "@/api/server";
import { useCards } from "@/composables/useCards";
import { useMutation } from "@tanstack/vue-query";

const name = ref("");
const description = ref("");
const { cards, addCard, deleteCard } = useCards();

const { mutateAsync, error, isPending } = useMutation({
  mutationFn: (formData) =>
    serverFetch("/module", {
      method: "POST",
      body: formData,
    }),
});

const onSubmit = async () => {
  const payload = {
    name: name.value,
    description: description.value,
    cards: cards.value,
  };

  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    cards.value.forEach((card) => {
      const { front, back, id } = card;

      const frontFile = front.img.get("img");
      const backFile = back.img.get("img");

      formData.append(`cards[${id}][front][img]`, frontFile);
      formData.append(`cards[${id}][back][img]`, backFile);
    });

    const data = await mutateAsync(formData);
    console.log("module created", data);
  } catch (error) {
    console.error("failed to create module", error);
  }
};
</script>
