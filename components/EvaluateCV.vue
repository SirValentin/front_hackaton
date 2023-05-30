<template>
  <div class="px-2 py-4">
    <div
      class="flex flex-col items-center border-2 border-dashed p-2 space-y-2"
      @dragover.prevent
      @drop="handleFileDrop"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
      </span>
      <p class="text-sm text-center">
        Haga clic o arrastre su CV a esta área para cargarlo
      </p>
      <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        accept=".pdf,.doc,.docx"
        hidden
      />
      <button class="button_primary" @click="$refs.fileInput.click()">
        {{ fileName || "Haga clic para cargar su CV" }}
      </button>
      <p></p>
      <p class="opacity-50 text-xs">Formato .pdf .doc .docx</p>
    </div>
    <div class="flex justify-center mt-6">
      <button
        class="button_primary w-max"
        :class="{ 'opacity-40 cursor-not-allowed': !selectedFile }"
        :disabled="!selectedFile || loadingResponse"
        @click="uploadFile"
      >
        <p v-if="!loadingResponse">Evaluar CV</p>
        <span v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 animate-loading"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </span>
      </button>
    </div>
    <div v-if="response && !loadingResponse" class="pt-4 space-y-4">
      <p
        class="text-white rounded px-1 font-bold w-max"
        :class="
          response.porcentaje_compatibilidad < 50
            ? 'bg-red-400'
            : response.porcentaje_compatibilidad < 70
            ? 'bg-yellow-400'
            : 'bg-green-400'
        "
      >
        {{ response.porcentaje_compatibilidad }}% compatible con el empleo
      </p>
      <div>
        <p>Pros:</p>
        <div class="space-y-1 w-full">
          <p
            v-for="pro in response.fortalezas"
            class="bg-green-500 rounded px-1 w-fit text-white text-sm font-bold"
          >
            {{ pro }}
          </p>
        </div>
      </div>
      <div>
        <p>Contras:</p>
        <div class="space-y-1 w-full">
          <p
            v-for="contra in response.debilidades"
            class="bg-red-500 rounded px-1 w-fit text-white text-sm font-bold"
          >
            {{ contra }}
          </p>
        </div>
      </div>
      <div class="w-full">
        <p>Sugerencias:</p>
        <ul class="list-inside list-disc space-y-2">
          <li
            v-for="sugerencia in response.sugerencias"
            class="text-sm font-bold"
          >
            {{ sugerencia }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useOfferStore } from "../store/offer";

const offerStore = useOfferStore();
const selectedFile = ref(null);
const fileName = ref("");
const response = ref(null);
const loadingResponse = ref(false);

function handleFileDrop(event) {
  event.preventDefault();
  selectedFile.value = event.dataTransfer.files[0];
  fileName.value = selectedFile.value.name;
}
function handleFileChange(event) {
  event.preventDefault();
  selectedFile.value = event.target.files[0];
  fileName.value = selectedFile.value.name;
}
async function uploadFile() {
  loadingResponse.value = true;
  const offer = `${offerStore.offerDetail.title}. ${offerStore.offerDetail.province.value}. 
    ${offerStore.offerDetail.description}. Requisitos minimos: ${offerStore.offerDetail.minRequirements}, 
    Sueldo: ${offerStore.offerDetail.salaryDescription}.`;
  const formData = new FormData();
  formData.append("file", selectedFile.value);
  formData.append("offer", offer);
  try {
    const { data } = await useMyFetch("extract_content/", {
      method: "POST",
      body: formData,
    });
    response.value = data.value.response;
  } catch (error) {
    console.log(error);
  }
  loadingResponse.value = false;
}
</script>
<style>
.animate-loading {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(-360deg);
  }
}
</style>
