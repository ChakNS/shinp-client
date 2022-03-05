/* eslint-disable prettier/prettier */
export interface FormChild {
  type: string
  key: string
  row: number
  formItemAttrs: {
    label: string
    [propName: string]: any
  }
  formAttrs?: unknown
  rowAttrs?: unknown
  colAttrs?: unknown
  typeAttrs?: unknown
  defaultValue?: unknown
  on?: {
    [propName: string]: Function
  }
  slots?: {
    [propName: string]: unknown
  }
  render?: Function
}

export interface FormConfig {
  title: string
  children: Array<FormChild>
  formAttrs?: unknown
  rowAttrs?: unknown
  typeAttrs?: unknown
  unfold?: boolean
}

export interface FormatConfig extends FormConfig {
  rows: Array<{ cols: Array<FormChild> }>
}
