<script setup lang="ts">
import { useAppStore } from "@/store/useAppStore";

defineProps({ modelValue: { type: Object } });

const emit = defineEmits(["query", "update:modelValue"]);

const route = useRoute();

const pagingRef = ref<any>(null);

const emitQuery = (...args: any[]) => emit("query", ...args);

onShow(async () => {
  if (!pagingRef.value) await nextTick();

  useAppStore().pagingRef.set(route.path!, pagingRef);
  route.aliasPath && useAppStore().pagingRef.set(route.aliasPath, pagingRef);
});
</script>

<template>
  <z-paging
    ref="pagingRef"
    :min-delay="150"
    :model-value="modelValue"
    v-bind="$attrs"
    @update:model-value="$emit('update:modelValue', $event)"
    @query="emitQuery"
  >
    <template #top>
      <slot name="top"></slot>
    </template>
    <slot> </slot>
    <template #cell>
      <slot name="cell"></slot>
    </template>
    <template #bottom>
      <slot name="bottom"></slot>
    </template>
  </z-paging>
</template>
