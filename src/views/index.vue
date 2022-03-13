<template>
  <div>
    首页
    <ShinpForm ref="shinpForm" :config="fromConfig" />
    <el-button type="primary" @click="getForm">获取</el-button>
    <div class="test-global test-scoped test-css">获取</div>
    <TestComp />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ShinpForm from '@/components/Form'
import TestComp from './test.vue'

const fromConfig = [
  {
    title: '测试1',
    children: [
      {
        type: 'formInput',
        key: 'taskNo',
        row: 1,
        defaultValue: 2,
        formItemAttrs: {
          label: '项目编号',
          required: true,
        },
        colAttrs: {
          span: 12,
        },
        typeAttrs: {
          disabled: true,
        },
      },
    ],
  },
  {
    title: '测试2',
    children: [],
  },
]

const shinpForm = ref(ShinpForm)

const getForm = () => {
  console.log(shinpForm.value.getValues().taskNo)
}
</script>

<style lang="scss">
.test-global {
  color: #102058;
}
</style>

<style lang="scss" scoped>
.test-scoped {
  color: #102058;
}
</style>

<style scoped>
.test-css {
  color: #102058;
}
</style>
