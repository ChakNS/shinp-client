/* eslint-disable no-unused-expressions */
/**
 * @description 表单项
 **/

import _cloneDeep from 'lodash/cloneDeep'
import { defaultFormItemAttrs, defaultColAttrs } from './default'
import generateComp from './comp'
import { FormChild } from '../types'
import { ElCol, ElFormItem } from 'element-plus'

interface formItemType {
  label: string
  required: boolean
  prop?: string
  rules?: {
    validator?: unknown
    required?: boolean
    message?: string
    trigger: string[]
  }
  validator?: unknown
}

function processAttrs(formItemAttrs: formItemType, col: FormChild) {
  const result = _cloneDeep(formItemAttrs)
  result.required && required(result, col)
  return result
}

function required(result: formItemType, { key }: { key: string }) {
  result.prop = key
  if (result.validator) {
    result.rules = { validator: result.validator, trigger: ['blur', 'change'] }
    return
  }
  result.rules = { required: true, message: `${result.label}必填`, trigger: ['blur', 'change'] }
}

export const formItem = (row: { cols: Array<FormChild> }, values: { [propName: string]: unknown }) => {
  return row.cols.map(col => {
    const { formItemAttrs, colAttrs = {} } = col
    const jointColAttrs = Object.assign(_cloneDeep(defaultColAttrs), colAttrs)
    const jointFormItemAttrs = processAttrs(Object.assign(_cloneDeep(defaultFormItemAttrs), formItemAttrs), col)
    return (
      <ElCol>
        <ElFormItem {...{ attrs: jointFormItemAttrs }} style="width: 100%;">
          {col.render ? col.render(values) : generateComp(col, values)}
        </ElFormItem>
      </ElCol>
    )
  })
}
