<script setup lang="ts">
import { useAppStore } from "@/store/useAppStore";
import type { AppMessageInstance, AppModalInstance, IModalProps } from "@/types";

const appStore = useAppStore();

const msgInstance = ref<AppMessageInstance | null>(null);
const modalInstance = ref<AppModalInstance | null>(null);

const modalProps = ref<IModalProps>({});

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
    :mask="modalProps.mask"
    :border="modalProps.border"
    :width="modalProps.width"
    :height="modalProps.height"
    :round="modalProps.round"
    :duration="modalProps.duration"
    :overlay-click="modalProps.overlayClick"
    :transparent="modalProps.transparent"
    :closeable="modalProps.closeable"
    :color="modalProps.color"
    :title="modalProps.title"
    :ok-text="modalProps.okText"
    :ok-color="modalProps.okColor"
    :ok-linear="modalProps.okLinear"
    :ok-linear-deep="modalProps.okLinearDeep"
    :btn-round="modalProps.btnRound"
    :hide-cancel="modalProps.hideCancel"
    :before-close="modalProps.onClose"
    :content="modalProps.content"
    :disabled="modalProps.disabled"
    :title-style="modalProps.titleStyle"
    :z-index="modalProps.zIndex"
    @open="modalProps.onOpen"
    @ok="modalProps.onConfirm"
    @cancel="modalProps.onCancel"
    @click="modalProps.onClick"
  />
</template>
