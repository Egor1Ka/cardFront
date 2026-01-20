<script setup>
import { ref } from "vue";
import CardFace from "@/components/card/CardFace.vue";
import Tag from "@/components/card/Tag.vue";

const props = defineProps({
  card: {
    type: Object,
    default: () => ({
      id: "6962627991cfa1c6d6b3d951",
      front: {
        img: {
          url: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1200&auto=format&fit=crop",
          imageType: "png",
          alt: "Test",
        },
        description: "Front side of the card",
        text: "Front",
      },
      back: {
        text: "Back",
        description: "Back side of the card",
        img: {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl7pJ8BfXJUsWLD4TYbULz2P9R9nOJRdJYSTYR-VX8R6PjjZGXyiTlneFiMJVdsuQN-CIr3T-th-DMhVYVpjsgwENdJcO2gnDJicmDVLLD&s=10",
          imageType: "png",
          alt: "Test",
        },
      },
      tags: ["demo", "mock"],
    }),
  },
});

const isFlipped = ref(false);

const toggleFlip = () => {
  isFlipped.value = !isFlipped.value;
};
</script>

<template>
  <div class="flip-card cursor-pointer" @click="toggleFlip">
    <div
      class="card-inner rounded-xl shadow-lg background"
      :class="{ 'is-flipped': isFlipped }"
    >
      <div class="card-face card-front">
        <div
          v-if="props.card.tags.length"
          class="absolute right-0 top-0 flex gap-1"
        >
          <Tag
            v-for="(tag, index) in props.card.tags"
            :key="`tag-${index}`"
            :text="tag"
          />
        </div>
        <CardFace
          :text="props.card.front.text"
          :img="props.card.front.img"
          :description="props.card.front.description"
        />
      </div>
      <div class="card-face card-back">
        <div
          v-if="props.card.tags.length"
          class="absolute right-0 top-0 flex gap-1"
        >
          <Tag
            v-for="(tag, index) in props.card.tags"
            :key="`tag-${index}`"
            :text="tag"
          />
        </div>
        <CardFace
          :text="props.card.back.text"
          :img="props.card.back.img"
          :description="props.card.back.description"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  perspective: 1000px;
}

.card-inner {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  display: grid;
}

.card-inner.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  backface-visibility: hidden;
  grid-area: 1 / 1;
}

.card-back {
  transform: rotateY(180deg);
}
</style>
