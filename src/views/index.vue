<script setup lang="ts">
import { ref } from 'vue'
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
console.log(x.value)
console.log(y.value)
</script>

<template>
  <el-button>测试</el-button>
</template>

<style scoped lang="scss">
a {
  color: #42b983;
}
.test {
  color: $test-color;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
