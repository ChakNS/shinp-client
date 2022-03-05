<template>表单</template>

<script lang="ts" setup>
import { computed, watch, reactive } from 'vue'
import { FormConfig } from './types'
import { groupingFormItem, groupingValues } from './tools/format'

const props = defineProps<{ config: Array<FormConfig> }>()

let buildedValues = reactive({})

const groupedConfig = computed(() => groupingFormItem(props.config))

console.log(groupedConfig.value)

watch(
  () => props.config,
  newVal =>
    (buildedValues = Object.assign(groupingValues(newVal), buildedValues)),
  {
    immediate: true,
    deep: true,
  }
)
</script>
