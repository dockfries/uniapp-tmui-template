<script setup lang="ts">
const props = withDefaults(defineProps<CommonButtonProps>(), {
  _class: "",
  type: "default",
  hoverClass: "_opacity-70",
  size: "medium",
  block: false,
  loading: false,
  disabled: false,
  label: "",
  openType: "",
});

const emits = defineEmits<{
  (e: "click", event: Event | TouchEvent): void;
  (e: "touchstart", event: Event | TouchEvent): void;
  (e: "touchmove", event: Event | TouchEvent): void;
  (e: "touchcancel", event: Event | TouchEvent): void;
  (e: "touchend", event: Event | TouchEvent): void;
  (e: "tap", event: Event | TouchEvent): void;
  (e: "longpress", event: Event | TouchEvent): void;
  (e: "getphonenumber", event: any): void;
  (e: "getUserInfo", event: any): void;
  (e: "getUserProfile", event: any): void;
  (e: "error", event: any): void;
  (e: "opensetting", event: any): void;
  (e: "launchapp", event: any): void;
  (e: "contact", event: any): void;
  (e: "chooseavatar", event: any): void;
}>();

interface CommonButtonProps {
  // eslint-disable-next-line vue/prop-name-casing
  _class?: string;
  type?: "default" | "warning" | "primary" | "success" | "error" | "black-gold" | "error-line";
  hoverClass?: string;
  iconClass?: string | (string | object)[];
  size?: "tiny" | "small" | "medium" | "large";
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  openType?: string;
  needLogin?: boolean;
}

const compatWeChatStyle = computed(() => {
  let style = "box-shadow: 0px 3px 8px -2px rgba(10, 9, 11, 0.07);";
  if (props.type === "black-gold") {
    style += `background: linear-gradient(180deg, #333537 0%, #242627 100%);`;
  }
  if (props.type === "black-gold") style += "border-color:#505050;color:#FAD6A5;";
  return style;
});

const buttonStyleByType = computed(() => {
  let classByType = "";
  switch (props.type) {
    case "primary":
      classByType = "_border-primary-600 _bg-primary-500 _text-white";
      break;

    case "warning":
      classByType = "_border-warning-500 _bg-warning-500 _text-white";
      break;

    case "error":
      classByType = "_border-error-500 _bg-error-500 _text-white";
      break;

    case "error-line":
      classByType = "_border-error-500 _bg-white _text-red-500";
      break;
    case "success":
      classByType = "_border-error-500 _bg-error-500 _text-white";
      break;

    default:
      classByType = " _bg-white";
      break;
  }

  classByType += " ";

  switch (props.size) {
    case "tiny":
      classByType += "_h-40rpx";
      break;

    case "small":
      classByType += "_h-60rpx";
      break;

    case "large":
      classByType += "_h-100rpx";
      break;

    default:
      classByType += "_h-80rpx";
      break;
  }

  return classByType;
});

const isHover = ref(false);

function touchstart(e: Event) {
  isHover.value = true;
  emits("touchstart", e);
}

function touchend(e: Event) {
  isHover.value = false;
  emits("touchend", e);
}

function touchcancel(e: Event) {
  isHover.value = false;
  emits("touchcancel", e);
}

function onclick(e: Event) {
  if (props.loading) return;
  emits("click", e);
}
</script>

<template>
  <button
    class="f-center! _px-28rpx _border-2rpx _border-solid _rounded-14rpx _text-28rpx! _font-bold _border-#E6E6E6 _text-#111827"
    :class="[
      isHover && !props.disabled && !props.loading ? props.hoverClass : '',
      props.loading || props.disabled ? '_opacity-80' : '',
      props.block ? '_w-full' : '',
      buttonStyleByType,
      _class,
    ]"
    :openType="props.openType"
    :loading="props.loading"
    :disabled="props.disabled"
    :hover-start-time="10000000"
    hover-stop-propagation
    :style="compatWeChatStyle"
    @click="onclick"
    @touchstart="touchstart"
    @touchend="touchend"
    @longpress="emits('longpress', $event)"
    @touchcancel="touchcancel"
    @touchmove="emits('touchmove', $event)"
    @getphonenumber="emits('getphonenumber', $event)"
    @error="emits('error', $event)"
    @opensetting="emits('opensetting', $event)"
    @launchapp="emits('launchapp', $event)"
    @contact="emits('contact', $event)"
    @chooseavatar="emits('chooseavatar', $event)"
  >
    <div v-if="props.iconClass" class="_mr-8px _text-40rpx" :class="[props.iconClass]"></div>
    <slot>
      <div>{{ props.label }}</div>
    </slot>
  </button>
</template>

<style scoped>
button {
  margin: 0;
}
button::after {
  background: transparent;
  background-color: transparent;
  border: none;
  border-radius: 0;
}
</style>
