<template>
  <div>
    首页
    <ShinpForm :config="fromConfig" />
  </div>
</template>

<script setup lang="ts">
import ShinpForm from '@/components/Form'

const fromConfig = [
  {
    title: '测试1',
    children: [],
  },
  {
    title: '测试2',
    children: [],
  },
]
</script>
