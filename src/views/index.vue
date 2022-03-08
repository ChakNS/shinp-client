<template>
  <div>
    首页
    <ShinpForm ref="shinpForm" :config="fromConfig" />
    <el-button @click="getForm">获取</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ShinpForm from '@/components/Form/form'

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
