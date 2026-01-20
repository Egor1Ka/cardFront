<template>
  <section class="">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card class="max-h-[300px]" v-for="(card, index) in cards" :key="index" />
    </div>
    <Card />
  </section>
</template>

<script setup>
import Card from "@/components/card/Card.vue";

const cards = [{}, {}, {}, {}, {}, {}];
</script>
