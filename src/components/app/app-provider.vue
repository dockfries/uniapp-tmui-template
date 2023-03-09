<template>
  <tm-message ref="msg" />
</template>
<script setup lang="ts">
import { useAppStore } from "@/store/useAppStore";
import { AppMessageInstance } from "@/types";

const appStore = useAppStore();
const msg = ref<AppMessageInstance | null>(null);
onMounted(() => (appStore.providers.messageInstance = msg.value));
</script>
