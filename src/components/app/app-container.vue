<template>
  <tm-app :class="{ dark: store.tmStore.dark }">
    <slot />
  </tm-app>
</template>
<script setup lang="ts">
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
const store = useTmpiniaStore();
</script>
