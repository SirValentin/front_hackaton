<template>
  <div
    :class="
      offerStore.offerSelected === props.offer.id
        ? 'bg-blue-200'
        : 'hover:bg-blue-50'
    "
    class="p-4 cursor-pointer"
    @click="offerStore.selectOffer(props.offer.id)"
  >
    <p class="font-bold text-lg">
      {{ props.offer.title }}
    </p>
    <p>{{ props.offer.author.name }}</p>
    <p>{{ props.offer.city }}, {{ props.offer.province.value }}</p>
  </div>
</template>

<script setup>
import { useOfferStore } from "../store/offer";

const offerStore = useOfferStore();
const props = defineProps(["offer"]);
</script>
