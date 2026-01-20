<template>
  <div class="border rounded-md py-2 px-3 mb-4 grid gap-1 background relative">
    <fa
      icon="trash"
      @click="deleteCard"
      class="cursor-pointer absolute right-2 top-2 text-red-500 transition-transform duration-150 hover:scale-110 hover:-rotate-6"
    />
    <Input
      :id="`${idPrefix}-front`"
      label="Front"
      placeholder="Enter front text"
      v-model="frontText"
    />
    <Collaps
      v-model:isOpen="frontOptionsOpen"
      content-class="grid grid-cols-2 gap-2"
    >
      <template #triger>
        <fa icon="gears" class="py-1" /><span>More Options</span>
      </template>
      <template #content>
        <Input
          :id="`${idPrefix}-front-img-file`"
          label="Immage"
          placeholder="Enter description"
          type="file"
          accept="image/*"
          @change="onFrontFileChange"
        />
        <Input
          :id="`${idPrefix}-front-description`"
          label="Description"
          placeholder="Enter description"
          v-model="frontDescription"
        />
      </template>
    </Collaps>

    <Input
      :id="`${idPrefix}-back`"
      label="Back"
      placeholder="Enter back text"
      v-model="backText"
    />
    <Collaps
      v-model:isOpen="backOptionsOpen"
      content-class="mt-2 grid grid-cols-2 gap-2"
    >
      <template #triger>
        <fa icon="gears" class="py-1" /><span>More Options</span>
      </template>
      <template #content>
        <Input
          :id="`${idPrefix}-back-img-file`"
          label="Image"
          type="file"
          accept="image/*"
          @change="onBackFileChange"
        />
        <Input
          :id="`${idPrefix}-back-description`"
          label="Description"
          placeholder="Enter description"
          v-model="backDescription"
        />
      </template>
    </Collaps>
  </div>
</template>

<script setup>
import Input from "@/components/ui/Input.vue";
import Collaps from "@/components/ui/Collaps.vue";
import { computed, ref, useSlots } from "vue";

const props = defineProps({
  idPrefix: {
    type: String,
    default: "card",
  },
  front: {
    type: Object,
    default: () => ({
      text: "",
      description: "",
      img: {
        url: "",
        imageType: "",
        alt: "",
      },
    }),
  },
  back: {
    type: Object,
    default: () => ({
      text: "",
      description: "",
      img: {
        url: "",
        imageType: "",
        alt: "",
      },
    }),
  },
});

const emit = defineEmits(["update:front", "update:back", "delete"]);

const frontOptionsOpen = ref(false);
const backOptionsOpen = ref(false);

const slot = useSlots();

const mergeSide = (current, patch) => {
  const currentImg = current.img;
  const patchImg = patch.img;
  let img;

  if (patchImg instanceof FormData) {
    img = patchImg;
  } else if (currentImg instanceof FormData) {
    img = currentImg;
  } else {
    img = {
      ...currentImg,
      ...(patchImg || {}),
    };
  }

  return {
    ...current,
    ...patch,
    img,
  };
};

const deleteCard = () => emit("delete");

const updateFront = (patch) => {
  emit("update:front", mergeSide(props.front, patch));
};

const updateBack = (patch) => {
  emit("update:back", mergeSide(props.back, patch));
};

const frontText = computed({
  get: () => props.front.text,
  set: (value) => updateFront({ text: value }),
});

const frontDescription = computed({
  get: () => props.front.description,
  set: (value) => updateFront({ description: value }),
});

const backText = computed({
  get: () => props.back.text,
  set: (value) => updateBack({ text: value }),
});

const backDescription = computed({
  get: () => props.back.description,
  set: (value) => updateBack({ description: value }),
});

const onFrontFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("img", file);

  updateFront({ img: formData });
};

const onBackFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("img", file);

  updateBack({ img: formData });
};
</script>
