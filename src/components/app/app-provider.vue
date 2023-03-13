<script setup lang="ts">
import { useAppStore } from "@/store/useAppStore";
import type { AppMessageInstance } from "@/types";

const appStore = useAppStore();
const msg = ref<AppMessageInstance | null>(null);
onMounted(() => (appStore.providers.messageInstance = msg.value));
</script>

<template>
  <TmMessage ref="msg" />
</template>
