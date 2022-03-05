import _cloneDeep from 'lodash/cloneDeep'
import { FormChild } from '../types'
import { ElInput } from 'element-plus'
import { ref } from 'vue'

const formInput = (col: FormChild, values: { [propName: string]: unknown }) => {
  const { key, on = {}, slots = [], typeAttrs } = col
  // 缓存配置定义的input事件监听
  // 防止重复监听导致的循环调用问题
  const _input = on.input

  return <ElInput v-model={values[key]}></ElInput>
}

export default formInput
