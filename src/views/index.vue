<template>
  <div>
    首页
    <ShinpForm :config="fromConfig" />
  </div>
</template>

<script setup lang="ts">
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
          span: 4,
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
</script>
