<template>
  <div>
    <div class="pb-4 flex space-x-4 items-center">
      <Logo />
      <div>
        <p>Evalua tu CV con la oferta laboral y</p>
        <p>Comprueba si eres el candidato perfecto para el empleo.</p>
      </div>
    </div>
    <div class="mb-2 flex items-center">
      <p class="pr-2">Categoria:</p>
      <select
        class="w-fit border-2 rounded-r-full rounded-l-full px-1"
        v-model="offerStore.categoryOfferList"
        @change="changeCategory"
      >
        <option value="">Todos</option>
        <option v-for="category in categoryList" :value="category.value">
          {{ category.text }}
        </option>
      </select>
    </div>
    <div class="flex space-x-2">
      <div class="bg-white flex flex-col w-1/4 height-container">
        <div class="w-full overflow-y-auto border rounded container-list">
          <OfferList />
        </div>
        <div>
          <div class="flex h-12">
            <button class="button_primary w-full" @click="previousPage">
              {{ "< ANTERIOR" }}
            </button>
            <div class="flex justify-center items-center px-2 w-16">
              <p>{{ offerStore.pageOfferList }}</p>
            </div>
            <button class="button_primary w-full" @click="nextPage">
              {{ "SIGUIENTE >" }}
            </button>
          </div>
        </div>
      </div>
      <div class="w-2/4 bg-white py-4 px-8 height-container rounded">
        <OfferDetailSkeleton
          v-show="offerStore.loadingOfferDetail"
          class="animate-pulse"
        />
        <OfferDetail
          v-show="offerStore.offerDetail && !offerStore.loadingOfferDetail"
        />
      </div>
      <div
        class="w-1/4 bg-white h-full shadow-lg shadow-cyan-500/50 rounded border-2 border-cyan-200"
      >
        <EvaluateCV />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useOfferStore } from "../store/offer";

const offerStore = useOfferStore();
const categoryList = [
  { value: "administracion-empresas", text: "Administración de empresas" },
  { value: "administracion-publica", text: "Administración Pública" },
  { value: "comercial-ventas", text: "Comercial y ventas" },
  { value: "compras-logistica-almacen", text: "Compras, logística y almacén" },
  { value: "diseno-artes-graficas", text: "Diseño y artes gráficas" },
  { value: "educacion-formacion", text: "Educación y formación" },
  { value: "finanzas-banca", text: "Finanzas y banca" },
  { value: "otros", text: "Otros" },
  {
    value: "informatica-telecomunicaciones",
    text: "Informática y telecomunicaciones",
  },
  { value: "ingenieros-tecnicos", text: "Ingenieros y técnicos" },
  { value: "profesiones-artes-oficios", text: "Profesiones, artes y oficios" },
  { value: "inmobiliario-construccion", text: "Inmobiliario y construcción" },
  { value: "legal", text: "Legal" },
  { value: "marketing-comunicacion", text: "Marketing y comunicación" },
  { value: "recursos-humanos", text: "Recursos humanos" },
  { value: "sanidad-salud", text: "Sanidad y salud" },
  { value: "sector-farmaceutico", text: "Sector Farmacéutico" },
  { value: "turismo-restauracion", text: "Turismo y restauración" },
];

async function changeCategory() {
  offerStore.pageOfferList = 1;
  await offerStore.getOfferList();
  offerStore.selectOffer(offerStore.offerList[0].id);
}

async function nextPage() {
  offerStore.pageOfferList++;
  await offerStore.getOfferList();
  offerStore.selectOffer(offerStore.offerList[0].id);
}
async function previousPage() {
  if (offerStore.pageOfferList > 1) {
    offerStore.pageOfferList--;
    await offerStore.getOfferList();
    offerStore.selectOffer(offerStore.offerList[0].id);
  }
}
</script>
<style>
.height-container {
  max-height: calc(100vh - 140px);
}
.container-list::-webkit-scrollbar {
  width: 10px;
}
.container-list::-webkit-scrollbar-track {
  background: transparent;
}
.container-list::-webkit-scrollbar-thumb {
  height: 32px;
  border-radius: 4px;
  background-color: #94a3b8c5;
}
</style>
