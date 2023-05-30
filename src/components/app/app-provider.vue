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
  const key = `modal-${uni.$tm.u.getUid(8)}`;
  const modal: IModalInstConfig = {
    ...props,
    key,
    instance: null,
    open() {
      return this.instance?.open();
    },
    close() {
      return this.instance?.close();
    },
    // destroy() {
    //   // close后数组中移除自身
    // },
  };
  modalInstances.value.push(modal);
  return modal;
}

function createMessage(props: MessageProps = {}) {
  const key = `message-${uni.$tm.u.getUid(8)}`;
  const message: IMessageInstConfig = {
    ...props,
    key,
    instance: null,
    show() {
      return this.instance?.show(props);
    },
    hide() {
      return this.instance?.hide();
    },
    destroy() {
      const idx = messageInstances.value.findIndex((m) => m.key === key);
      if (idx > -1) messageInstances.value.splice(idx, 1);
    },
  };
  messageInstances.value.push(message);
  return message;
}

if (!appStore.providers.modal) {
  appStore.providers.modal = createModal;
}
if (!appStore.providers.message) {
  appStore.providers.message = createMessage;
}
</script>

<template>
  <TmModal
    v-for="modal in modalInstances"
    :key="modal.key"
    :ref="(el) => dynamicModalRef(el, modal.key)"
    v-bind="omit(modal, 'key', 'onConfirm', 'onClose', 'open', 'close', 'instance')"
    @before-close="modal.onClose"
    @ok="modal.onConfirm"
  />
  <TmMessage
    v-for="message in messageInstances"
    :key="message.key"
    :ref="(el) => dynamicMessageRef(el, message.key)"
    v-bind="omit(message, 'key', 'instance')"
  />
</template>
