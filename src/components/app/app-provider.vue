<script setup lang="ts">
import { omit } from "lodash-es";
import { useAppStore } from "@/store/useAppStore";
import type {
  AppMessageInstance,
  AppModalInstance,
  IMessageInstConfig,
  IModalInstConfig,
  MessageProps,
  ModalProps,
} from "@/types";

const appStore = useAppStore();

const modalInstances = ref<IModalInstConfig[]>([]);
const messageInstances = ref<IMessageInstConfig[]>([]);

const dynamicModalRef = (instance: unknown, key: string) => {
  const idx = modalInstances.value.findIndex((m) => m.key === key);

  if (!instance) {
    if (idx > -1) modalInstances.value.splice(idx, 1);
  } else {
    if (idx > -1) modalInstances.value[idx].instance = instance as AppModalInstance;
  }
};

const dynamicMessageRef = (instance: unknown, key: string) => {
  const idx = messageInstances.value.findIndex((m) => m.key === key);

  if (!instance) {
    if (idx > -1) messageInstances.value.splice(idx, 1);
  } else {
    if (idx > -1) messageInstances.value[idx].instance = instance as AppMessageInstance;
  }
};

function createModal(props: ModalProps = {}) {
  let isDestroyed = false;
  const key = `modal-${uni.$tm.u.getUid(1, 8)}`;
  const modal: IModalInstConfig = {
    ...props,
    key,
    instance: null,
    open() {
      if (isDestroyed) return;
      if (this.instance) return this.instance.open();
      setTimeout(() => this.open(), 60);
    },
    close() {
      if (isDestroyed) return;
      if (this.instance) return this.instance.close();
      setTimeout(() => this.close(), 60);
    },
    destroy() {
      if (isDestroyed) return;
      const idx = modalInstances.value.findIndex((item) => item.key === key);
      if (idx > -1) {
        isDestroyed = true;
        modalInstances.value.splice(idx, 1);
      }
    },
  };
  modalInstances.value.push(modal);
  console.log(modalInstances);
  return modal;
}

function createMessage(props: MessageProps = {}) {
  let isDestroyed = false;
  const key = `message-${uni.$tm.u.getUid(1, 8)}`;
  const message: IMessageInstConfig = {
    ...props,
    key,
    instance: null,
    show() {
      if (isDestroyed) return;
      if (this.instance) return this.instance.show(props);
      setTimeout(() => this.show(), 60);
    },
    hide() {
      if (isDestroyed) return;
      if (this.instance) return this.instance.hide();
      setTimeout(() => this.hide(), 60);
    },
    destroy() {
      if (isDestroyed) return;
      const idx = messageInstances.value.findIndex((m) => m.key === key);
      if (idx > -1) {
        isDestroyed = true;
        messageInstances.value.splice(idx, 1);
      }
    },
  };
  messageInstances.value.push(message);
  return message;
}

async function destroyAfterCancel(modal: IModalInstConfig) {
  const res = await modal.onCancel?.();
  if (res !== false) {
    setTimeout(() => {
      modal.destroy();
    }, 300);
  }
  return res;
}

async function destroyAfterConfirm(modal: IModalInstConfig) {
  const res = await modal.onConfirm?.();
  if (res !== false) {
    setTimeout(() => {
      modal.destroy();
    }, 300);
  }
  return res;
}

onShow(() => {
  appStore.providers.modal = createModal;
  appStore.providers.message = createMessage;
});
</script>

<template>
  <CommonModal
    v-for="modal in modalInstances"
    :key="modal.key"
    :ref="(el) => dynamicModalRef(el, modal.key)"
    v-bind="omit(modal, 'key', 'onConfirm', 'onCancel', 'open', 'close', 'instance')"
    :on-cancel="() => destroyAfterCancel(modal)"
    :on-confirm="() => destroyAfterConfirm(modal)"
  />
  <TmMessage
    v-for="message in messageInstances"
    :key="message.key"
    :ref="(el) => dynamicMessageRef(el, message.key)"
    v-bind="omit(message, 'key', 'instance')"
  />
</template>
