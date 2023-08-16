<script setup lang="ts">
import dayjs from "dayjs";

interface CommonTimeProps {
  modelValue: any;
  placeholder?: string;
  format?: string;
}

const props = withDefaults(defineProps<CommonTimeProps>(), { format: "YYYY/MM/DD" });

const emits = defineEmits(["update:modelValue"]);

const isShow = ref(false);

const modelStr = ref("");

watch(
  () => props.modelValue,
  (value) => {
    if (modelStr.value) return;
    modelStr.value = value ? dayjs(props.modelValue).format(props.format) : "";
  },
  { immediate: true }
);

function patchAfterAnimation(value: string) {
  nextTick(() => {
    if (isShow.value === false) {
      updateTime(value);
    }
  });
}

function updateTime(val: string) {
  const str = dayjs(val).format(props.format);
  modelStr.value = str;
  emits("update:modelValue", str);
}
</script>

<template>
  <view
    class="common-card common-shadow _flex _items-center _justify-between _bg-white"
    tabindex="0"
    @click="isShow = !isShow"
  >
    <view :class="[!modelStr ? '_text-#71717A' : '']">{{ modelStr || placeholder }}</view>
    <view
      class="i-icon-chevron-down _text-#71717A _rotate-0 _transition-all _duration-300"
      :class="[{ '_rotate-180': isShow }]"
    ></view>
  </view>

  <tm-time-picker
    v-bind="$attrs"
    v-model:show="isShow"
    v-model:model-str="modelStr"
    :default-value="modelValue"
    :model-value="modelValue"
    :format="format"
    immediate-change
    @update:model-value="updateTime"
    @change="patchAfterAnimation"
    @confirm="isShow = false"
  />
</template>
