<template>
  <div class="h-full overflow-y-auto">
    <div v-if="offerStore.offerDetail">
      <div class="border-b pb-4">
        <div>
          <p class="font-bold text-lg">
            {{ offerStore.offerDetail.title }}
          </p>
          <p>{{ offerStore.offerDetail.profile.name }}</p>
          <p>
            {{ offerStore.offerDetail.city }},
            {{ offerStore.offerDetail.province.value }}
          </p>
        </div>
        <div class="pt-4">
          <p class="bg-gray-200 w-fit px-1 rounded-md font-bold">
            {{ offerStore.offerDetail.salaryDescription }}
          </p>
        </div>
      </div>
      <div class="pt-4">
        <div class="pb-4 flex space-x-2">
          <p
            class="border border-gray-400 w-fit px-2 rounded-r-full rounded-l-full"
          >
            Jornada {{ offerStore.offerDetail.journey?.value }}
          </p>
          <p
            class="border border-gray-400 w-fit px-2 rounded-r-full rounded-l-full"
          >
            Contrato {{ offerStore.offerDetail.contractType?.value }}
          </p>
        </div>
        <div>
          <p>{{ offerStore.offerDetail.description }}</p>
        </div>
        <div v-show="offerStore.offerDetail.minRequirements" class="pt-4">
          <p class="font-bold text-lg">Requerimientos:</p>
          <p>{{ offerStore.offerDetail.minRequirements }}</p>
        </div>
        <div class="w-full h-0.5 bg-gray-300 my-4"></div>
        <div>
          <p class="text-lg font-bold">
            Acerca de {{ offerStore.offerDetail.profile.name }}
          </p>
          <div v-show="offerStore.offerDetail.profile.logoUrl" class="w-fit">
            <a target="_blank" :href="offerStore.offerDetail.profile.url">
              <img
                :src="offerStore.offerDetail.profile.logoUrl"
                alt=""
                class="w-28 h-28"
              />
            </a>
          </div>
          <p>{{ offerStore.offerDetail.profile.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOfferStore } from "../store/offer";

const offerStore = useOfferStore();
</script>

<style>
.button_primary {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 8px;
  background: #167db7;
  border-radius: 4px;
  color: white;
  font-weight: 600;
  font-size: 14px;
}
</style>
