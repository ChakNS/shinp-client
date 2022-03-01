/**
 * @description 配置处理函数
 **/

import { FormConfig } from '../types'

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
