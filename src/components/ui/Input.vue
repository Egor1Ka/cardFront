<template>
  <div>
    <Label v-if="label" class="block text-sm" :for="id">
      {{ label }}
    </Label>
    <Primitive
      as="input"
      :id="id"
      :type="type"
      class="w-full p-1 rounded border border-[var(--border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-muted-foreground"
      :placeholder="placeholder"
      :accept="accept"
      :value="modelValue"
      @input="onInput"
      @change="onChange"
    />
  </div>
</template>

<script setup>
import { Label, Primitive } from "reka-ui";

defineProps({
  id: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  accept: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const onInput = (event) => {
  if (event?.target?.type === "file") return;
  emit("update:modelValue", event.target.value);
};

const onChange = (event) => {
  emit("change", event);
};
</script>
