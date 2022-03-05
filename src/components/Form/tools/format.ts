/**
 * @description 配置处理函数
 **/

import { nextTick } from 'vue'
import { FormConfig, FormChild, FormatConfig } from '../types'

// 根据行组织表单结构
export const groupingFormItem = (config: Array<FormConfig>): FormatConfig[] => {
  try {
    return config.map(column => {
      const rows: Array<{ cols: Array<FormChild> }> = []
      column.children.forEach(item => {
        if (rows[item.row]) {
          rows[item.row].cols.push(item)
        } else {
          rows[item.row] = { cols: [item] }
        }
      })
      return { ...column, rows: rows.filter(Boolean) }
    })
  } catch (error) {
    console.log(error)
    return config.map(column => ({ ...column, rows: [] }))
  }
}

const handleMap: {
  [propName: string]: (item: FormChild, values: { [propName: string]: unknown }) => void
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
