<template>
  <div>
    <div class="space-y-2 mb-6">
      <div class="rounded-r-full rounded-l-full h-6 bg-gray-300 w-64"></div>
      <div class="rounded-r-full rounded-l-full h-4 bg-gray-300 w-60"></div>
      <div class="rounded-r-full rounded-l-full h-4 bg-gray-300 w-56"></div>
    </div>
    <div class="space-y-2">
      <div
        v-for="pulseIndex in 10"
        class="rounded-r-full rounded-l-full h-4 bg-gray-300 w-full"
      ></div>
    </div>
  </div>
</template>
