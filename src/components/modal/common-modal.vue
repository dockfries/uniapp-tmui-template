<script setup lang="ts">
interface CommonModalProps {
  show?: boolean;
  title?: string;
  content?: String;
  align?: "left" | "right" | "center";
  round?: number;
  width?: string | number;
  showCancel?: boolean;
  cancelType?: string;
  cancelText?: string;
  confirmType?: string;
  confirmText?: string;
  overlayClick?: boolean;
  onConfirm?: () => boolean | void | Promise<boolean | void>;
  onCancel?: () => boolean | void | Promise<boolean | void>;
}

const props = withDefaults(defineProps<CommonModalProps>(), {
  align: "left",
  cancelType: "default",
  cancelText: "取消",
  confirmType: "primary",
  confirmText: "确认",
  showCancel: true,
  overlayClick: true,
  round: 20,
  width: "80%",
});

const emits = defineEmits(["update:show", "cancel", "confirm"]);

const _show = ref(props.show || false);

watch(
  () => props.show,
  (value) => {
    _show.value = value;
  }
);

function open() {
  _toggle();
}

function close() {
  _toggle(false);
}

async function cancel() {
  let canClose;
  if (props.onCancel) {
    canClose = await props.onCancel?.();
  }
  if (canClose !== false) {
    emits("cancel");
    _toggle(false);
  }
}

async function confirm() {
  let canClose;
  if (props.onCancel) {
    canClose = await props.onConfirm?.();
  }
  if (canClose !== false) {
    emits("confirm");
    _toggle(false);
  }
}

function _toggle(isShow = true) {
  _show.value = isShow;
  emits("update:show", isShow);
}

function onclickMask() {
  if (props.overlayClick) {
    close();
  }
}

defineExpose({ open, close });
</script>

<template>
  <view class="common-modal" :class="{ 'common-modal--show': _show }">
    <view class="common-modal__mask" @click="onclickMask"></view>
    <view
      class="common-modal__container"
      :style="{
        width: typeof width === 'number' ? `${width}rpx` : width,
        borderRadius: `${round}rpx`,
      }"
    >
      <slot name="title">
        <view
          v-if="title"
          class="common-modal__header _p-24rpx _text-#111827 _text-36rpx _font-bold"
          :style="{ textAlign: align }"
          >{{ title }}</view
        >
      </slot>

      <view class="common-modal__content _px-24rpx _box-border">
        <slot>
          {{ content }}
        </slot>
      </view>
      <view class="common-modal__footer _flex">
        <slot name="footer">
          <view class="_p-24rpx _flex _items-center _w-full _gap-20rpx">
            <commonButton
              v-if="showCancel"
              class="_flex-1"
              block
              :type="cancelType"
              :need-login="false"
              @click="cancel"
              >{{ cancelText }}</commonButton
            >
            <commonButton
              class="_flex-1"
              block
              :type="confirmType"
              :need-login="false"
              @click="confirm"
              >{{ confirmText }}</commonButton
            >
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.common-modal {
  position: fixed;
  visibility: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;

  &.common-modal--show {
    visibility: visible;
  }

  &__container {
    position: absolute;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.3s;
    background-color: #fff;
    overflow: hidden;
    opacity: 0;
    transition: opacity 200ms ease-in;
  }

  &__mask {
    display: block;
    position: absolute;
    z-index: 998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    backdrop-filter: blur(4px);
    transition: opacity 200ms ease-in;
    &.common-modal--show {
      opacity: 1;
    }
  }

  &--show {
    .common-modal__container,
    .common-modal__mask {
      opacity: 1;
    }
  }
}
</style>
