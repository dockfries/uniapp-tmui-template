<script setup lang="ts">
import { omit } from "lodash";
import { useAppStore } from "@/store/useAppStore";
import type { AppMessageInstance, AppModalInstance, IModalProps } from "@/types";

const appStore = useAppStore();

const msgInstance = ref<AppMessageInstance | null>(null);
const modalInstance = ref<AppModalInstance | null>(null);

const modalProps = ref<IModalProps>({});

const computedModalProps = computed(() => {
  return omit(modalProps.value, "onConfirm", "onClose");
});

onShow(() => {
  nextTick(() => {
    if (appStore.providers.message) {
      appStore.providers.message.instance = msgInstance.value;
    }
    if (appStore.providers.modal) {
      appStore.providers.modal.instance = modalInstance.value;

      appStore.providers.modal.setConfig = (props = {}) => {
        modalProps.value = props;
      };
    }
  });
});
</script>

<template>
  <TmMessage ref="msgInstance" />
  <TmModal
    ref="modalInstance"
    v-bind="computedModalProps"
    @before-close="modalProps.onClose"
    @ok="modalProps.onConfirm"
  />
</template>
