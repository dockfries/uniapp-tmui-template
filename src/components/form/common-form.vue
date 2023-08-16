<script setup lang="ts">
import { cloneDeep, isEmpty } from "lodash-es";

interface CommonFormItem {
  key: string;
  type: "input" | "select" | "city" | "time" | "textarea" | "custom";
  label?: string;
  required?: boolean;
  showRequired?: boolean;
  desc?: string;
  props?: object;
  slotName?: string;
  city?: object;
  placeholder?: string;
  validate?: (value: any) => boolean | string;
  trigger?: "blur" | "input";
}

interface CommonFormConfig {
  children: CommonFormItem[];
}

interface CommonFormProps {
  modelValue: Record<CommonFormItem["key"], any>;
  config: CommonFormConfig;
}

const props = defineProps<CommonFormProps>();

const emits = defineEmits(["update:modelValue"]);

const errorKeys = ref<Record<CommonFormItem["key"], any>>({});

function onFormItemUpdate(formItem: CommonFormItem, val: any) {
  const value = cloneDeep(props.modelValue);
  value[formItem.key] = val;
  emits("update:modelValue", value);
  if (!formItem.trigger || formItem.trigger === "input") {
    nextTick(() => validateOne(formItem));
  }
  console.log(value, "form-updated");
}

function validateOne(formItem: CommonFormItem) {
  let isValid = true;
  if (formItem.required) {
    isValid = !isEmpty(props.modelValue[formItem.key]);
  }
  if (formItem.validate) {
    const validateRet = formItem.validate(props.modelValue[formItem.key]);
    if (typeof validateRet === "string") {
      isValid = false;
      errorKeys.value[formItem.key] = validateRet;
      return isValid;
    } else {
      isValid = isValid && validateRet;
    }
  }
  errorKeys.value[formItem.key] = isValid ? false : defaultPlaceholder(formItem);
  return isValid;
}

function validateAll() {
  const flag: boolean[] = [];
  props.config.children.forEach((item) => {
    flag.push(validateOne(item));
  });
  return !flag.length || flag.every((item) => item === true);
}

function validateOnBlur(formItem: CommonFormItem) {
  if (formItem.trigger === "blur") {
    validateOne(formItem);
  }
}

// validateAll();

function defaultPlaceholder(formItem: CommonFormItem) {
  if (formItem.placeholder) return formItem.placeholder;
  if (["input", "textarea"].includes(formItem.type)) return `请输入${formItem.label || ""}`;
  if (formItem.type === "custom") return "";
  return `请选择${formItem.label || ""}`;
}

defineExpose({ validate: validateAll });
</script>

<template>
  <view v-for="item in config.children" :key="item.key" class="_mb-24rpx last:_mb-0">
    <view class="_flex _items-center _justify-between">
      <view class="_text-medium">{{ item.label }}</view>
      <view v-if="item.required && item.showRequired !== false" class="_text-#A1A1AA _text-24rpx"
        >必填</view
      >
    </view>
    <view class="_mt-10rpx">
      <CommonInput
        v-if="item.type === 'input'"
        :placeholder="defaultPlaceholder(item)"
        v-bind="item.props || {}"
        :model-value="modelValue[item.key]"
        @update:model-value="onFormItemUpdate(item, $event)"
        @blur="validateOnBlur(item)"
      />
      <CommonSelect
        v-else-if="item.type === 'select'"
        :placeholder="defaultPlaceholder(item)"
        v-bind="item.props || {}"
        :model-value="modelValue[item.key]"
        @update:model-value="onFormItemUpdate(item, $event)"
      />
      <CommonTextArea
        v-else-if="item.type === 'textarea'"
        :placeholder="defaultPlaceholder(item)"
        v-bind="item.props || {}"
        :model-value="modelValue[item.key]"
        @update:model-value="onFormItemUpdate(item, $event)"
        @blur="validateOnBlur(item)"
      />
      <CommonCity
        v-else-if="item.type === 'city'"
        :placeholder="defaultPlaceholder(item)"
        v-bind="item.props || {}"
        :city="item.city"
        :model-value="modelValue[item.key]"
        @update:model-value="onFormItemUpdate(item, $event)"
      />
      <CommonTime
        v-else-if="item.type === 'time'"
        :placeholder="defaultPlaceholder(item)"
        v-bind="item.props || {}"
        :model-value="modelValue[item.key]"
        @update:model-value="onFormItemUpdate(item, $event)"
      />
      <slot
        v-else-if="item.type === 'custom'"
        name="custom"
        :slot-name="item.slotName"
        :value="modelValue[item.key]"
        :trigger-update="(val: any) => onFormItemUpdate(item, val)"
        :trigger-validate="() => validateOnBlur(item)"
      />
      <view v-if="errorKeys[item.key]" class="_mt-10rpx _text-error-500">{{
        errorKeys[item.key]
      }}</view>
    </view>
    <view v-if="item.desc" class="_text-#A1A1AA _text-24rpx _mt-10rpx">{{ item.desc }}</view>
  </view>
</template>
