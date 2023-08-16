<script setup lang="ts">
import { userApi } from "@/request/modules/user";

interface CommonCityProps {
  modelValue: any;
  placeholder?: string;
  city?: object;
}

defineProps<CommonCityProps>();
defineEmits(["update:modelValue"]);
const cityDatas = ref([]);

// 获取本地的城市配置信息
async function getLocations() {
  let { key, citys } = uni.getStorageSync("locations");
  key = key && citys ? key : "";
  const res: any = await userApi.getLocations(key);
  if (res.locations.citys.length) {
    citys = res.locations.citys;
    uni.setStorageSync("locations", res.locations);
  }
  const fn = (e: any) => ({
    text: e.n,
    id: e.v,
    name: e.n,
    ...(e.c.length ? { children: e.c.map(fn) } : {}),
  });

  cityDatas.value = citys.map(fn);
}

onMounted(() => {
  getLocations();
});

const isShow = ref(false);
const modelStr = ref("");
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

  <tm-city-picker
    v-bind="$attrs"
    v-model:show="isShow"
    v-model:model-str="modelStr"
    :city="cityDatas"
    :model-value="modelValue"
    @update:model-value="(val: any) => $emit('update:modelValue', val)"
  />
</template>
