/**
 * @description 配置处理函数
 **/

import { nextTick } from 'vue'
import { FormConfig, FormChild } from '../types'

// 根据行组织表单结构
export const groupingFormItem = (config: Array<FormConfig>) => {
  try {
    return config.map(() => {
      return []
    })
  } catch (error) {
    console.log(error)
    return []
  }
}

const handleMap: {
  [propName: string]: (
    item: FormChild,
    values: { [propName: string]: unknown }
  ) => void
} = {
  formImage: (item, formValues) => {
    nextTick(() => {
      try {
        formValues[item.key] = []
      } catch (error) {
        formValues[item.key] = []
      }
    })
  },
}

export const groupingValues = (config: Array<FormConfig>) => {
  try {
    const values: { [propName: string]: unknown } = {}

    config.forEach((column: FormConfig) => {
      column.children.forEach(item => {
        const { key, type, defaultValue } = item

        if (!Object.prototype.hasOwnProperty.call(handleMap, type)) {
          values[key] = typeof defaultValue !== 'undefined' ? defaultValue : ''
        } else {
          handleMap[type](item, values)
        }
      })
    })

    return values
  } catch (error) {
    console.log(error)
    return {}
  }
}
