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
    title: '123',
    children: [],
  },
]
</script>
