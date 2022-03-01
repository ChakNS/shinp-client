<template>表单</template>

<script lang="ts" setup>
import { computed, watch, reactive } from 'vue'
import { FormConfig } from './types'
import { groupingFormItem } from './tools/format'

let buildedValues = reactive({})
const groupedConfig = computed(() => groupingFormItem(props.config))
const props = defineProps<{ config: Array<FormConfig> }>()

console.log(groupedConfig.value)

const groupingValues = (config: Array<FormConfig>) => {
  console.log(config)
  return {}
}

watch(
  () => props.config,
  (newVal) =>
    (buildedValues = Object.assign(groupingValues(newVal), buildedValues)),
  {
    immediate: true,
    deep: true,
  }
)
</script>
