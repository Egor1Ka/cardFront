<template>
  <div class="background rounded-xl p-4 shadow-md relative">
    <button
      type="button"
      class="absolute right-3 top-3 text-gray-300 transition hover:scale-110 hover:text-white disabled:opacity-60"
      :disabled="isPending"
      @click="onEditClick"
    >
      <fa :icon="isEditing ? 'check' : 'pen'" />
    </button>

    <div class="flex items-center gap-4">
      <div class="flex min-w-0 flex-1 items-center gap-3">
        <div class="h-12 w-12">
          <img
            v-if="cardState.front?.img?.url"
            class="h-12 w-12 rounded-md object-cover"
            :src="cardState.front.img.url"
            :alt="cardState.front.img.alt || 'Front image'"
          />
          <div
            v-else
            class="h-12 w-12 rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]"
          ></div>
        </div>
        <div v-if="isEditing" class="flex items-center gap-2">
          <button
            type="button"
            class="text-gray-300 transition hover:scale-110 hover:text-white disabled:opacity-60"
            :disabled="isPending"
            @click="openFrontPicker"
          >
            <fa icon="image" />
          </button>
          <input
            ref="frontFileInput"
            class="hidden"
            type="file"
            accept="image/*"
            @change="onFrontImageChange"
          />
        </div>
        <div class="min-w-0 w-full">
          <template v-if="isEditing">
            <input
              v-model="draft.frontText"
              class="w-full rounded border border-[var(--border)] bg-[var(--color-surface)] px-2 py-1 font-semibold text-[var(--color-text)] placeholder:text-muted-foreground"
              placeholder="Front text"
              @keydown.enter.prevent="submitEdit"
            />
            <input
              v-model="draft.frontDescription"
              class="mt-2 w-full rounded border border-[var(--border)] bg-[var(--color-surface)] px-2 py-1 text-sm text-[var(--color-text)] placeholder:text-muted-foreground"
              placeholder="Front description"
              @keydown.enter.prevent="submitEdit"
            />
          </template>
          <template v-else>
            <div class="truncate font-semibold">{{ cardState.front?.text }}</div>
            <div class="text-sm text-muted-foreground">
              {{ cardState.front?.description }}
            </div>
          </template>
        </div>
      </div>

      <div class="h-10 w-px bg-[var(--color-border)]"></div>

      <div class="flex min-w-0 flex-1 items-center gap-3">
        <div class="h-12 w-12">
          <img
            v-if="cardState.back?.img?.url"
            class="h-12 w-12 rounded-md object-cover"
            :src="cardState.back.img.url"
            :alt="cardState.back.img.alt || 'Back image'"
          />
          <div
            v-else
            class="h-12 w-12 rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]"
          ></div>
        </div>
        <div v-if="isEditing" class="flex items-center gap-2">
          <button
            type="button"
            class="text-gray-300 transition hover:scale-110 hover:text-white disabled:opacity-60"
            :disabled="isPending"
            @click="openBackPicker"
          >
            <fa icon="image" />
          </button>
          <input
            ref="backFileInput"
            class="hidden"
            type="file"
            accept="image/*"
            @change="onBackImageChange"
          />
        </div>
        <div class="min-w-0 w-full">
          <template v-if="isEditing">
            <input
              v-model="draft.backText"
              class="w-full rounded border border-[var(--border)] bg-[var(--color-surface)] px-2 py-1 font-semibold text-[var(--color-text)] placeholder:text-muted-foreground"
              placeholder="Back text"
              @keydown.enter.prevent="submitEdit"
            />
            <input
              v-model="draft.backDescription"
              class="mt-2 w-full rounded border border-[var(--border)] bg-[var(--color-surface)] px-2 py-1 text-sm text-[var(--color-text)] placeholder:text-muted-foreground"
              placeholder="Back description"
              @keydown.enter.prevent="submitEdit"
            />
          </template>
          <template v-else>
            <div class="truncate font-semibold">{{ cardState.back?.text }}</div>
            <div class="truncate text-muted-foreground">
              {{ cardState.back?.description }}
            </div>
          </template>
        </div>
      </div>
    </div>

    <div v-if="error" class="mt-2 text-sm text-red-500">
      {{ error.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import serverFetch from "@/api/server";
import { useMutation, useQueryClient } from "@tanstack/vue-query";

const props = defineProps({
  card: {
    type: Object,
  },
  moduleId: {
    type: String,
    default: "",
  },
});

const queryClient = useQueryClient();
const isEditing = ref(false);
const cardState = ref(props.card);
const frontFileInput = ref(null);
const backFileInput = ref(null);

const getDraft = (card) => ({
  frontText: card?.front?.text || "",
  frontDescription: card?.front?.description || "",
  backText: card?.back?.text || "",
  backDescription: card?.back?.description || "",
});

const draft = ref(getDraft(props.card));

watch(
  () => props.card,
  (value) => {
    if (!isEditing.value) {
      cardState.value = value;
    }
  },
  { deep: true },
);

const { mutateAsync, error, isPending } = useMutation({
  mutationFn: (payload) =>
    serverFetch(`/cards/${props.card.id}`, {
      method: "PUT",
      body: payload,
    }),
  onSuccess: () => {
    if (props.moduleId) {
      queryClient.invalidateQueries({
        queryKey: ["module-cards", props.moduleId],
      });
    }
  },
});

const startEditing = () => {
  draft.value = getDraft(cardState.value);
  isEditing.value = true;
};

const buildPayloadFromDraft = () => ({
  front: {
    ...(cardState.value?.front || {}),
    text: draft.value.frontText,
    description: draft.value.frontDescription,
  },
  back: {
    ...(cardState.value?.back || {}),
    text: draft.value.backText,
    description: draft.value.backDescription,
  },
});

const buildPayloadFromState = () => ({
  front: { ...(cardState.value?.front || {}) },
  back: { ...(cardState.value?.back || {}) },
});

const submitEdit = async () => {
  if (isPending.value) return;
  try {
    const payload = buildPayloadFromDraft();
    const updated = await mutateAsync(payload);
    cardState.value = updated || { ...cardState.value, ...payload };
    isEditing.value = false;
  } catch (submitError) {
    console.error("Failed to update card", submitError);
  }
};

const uploadImage = async (side, file) => {
  if (!file || isPending.value) return;
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(buildPayloadFromState()));
    formData.append(`${side}[img]`, file);
    const updated = await mutateAsync(formData);
    cardState.value = updated || cardState.value;
  } catch (uploadError) {
    console.error("Failed to update card image", uploadError);
  }
};

const onEditClick = () => {
  if (isEditing.value) {
    submitEdit();
    return;
  }
  startEditing();
};

const openFrontPicker = () => frontFileInput.value?.click();
const openBackPicker = () => backFileInput.value?.click();

const onFrontImageChange = async (event) => {
  const file = event.target.files?.[0];
  event.target.value = "";
  await uploadImage("front", file);
};

const onBackImageChange = async (event) => {
  const file = event.target.files?.[0];
  event.target.value = "";
  await uploadImage("back", file);
};
</script>
