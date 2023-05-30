<template>
  <div>
    <div v-if="offerStore.loadingOffers" class="space-y-4 p-1">
      <div
        v-for="pulseIndex in 6"
        class="h-40 w-full bg-gray-300 animate-pulse rounded"
      ></div>
    </div>
    <div v-else class="divide-y-2 divide-gray-300">
      <div v-for="offer in offerStore.offerList" :key="offer.id">
        <OfferCard :offer="offer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOfferStore } from "../store/offer";
const offerStore = useOfferStore();

await offerStore.getOfferList();
offerStore.selectOffer(offerStore.offerList[0].id);
</script>
<style>
a {
  background-color: rgb(232, 242, 248);
}
</style>
