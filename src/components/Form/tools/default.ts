/**
 * @description 表单默认属性
 **/
import { FormChild } from '../types'

export const defaultFormAttrs = Object.freeze({
  inline: true,
  size: 'small',
  labelPosition: 'right',
  labelWidth: '80px',
})
export const defaultRowAttrs = Object.freeze({})

export const defaultFormItemAttrs = Object.freeze({
  required: false,
})

export const defaultColAttrs = Object.freeze({})

export const defaultTypeAttrs = Object.freeze({
  size: 'small',
  clearable: true,
})

export const defaultInputAttrs = (col: FormChild) => ({
  placeholder: `请输入${col.formItemAttrs.label || ''}`,
})
