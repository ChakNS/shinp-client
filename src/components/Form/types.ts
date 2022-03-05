/* eslint-disable prettier/prettier */
export interface FormChild {
  type: string
  key: string
  row: number
  defaultValue: unknown
}

export interface FormConfig {
  title: string
  children: Array<FormChild>
  formAttrs?: unknown
  rowAttrs?: unknown
  typesAttrs?: unknown
  unfold?: boolean
}

export interface FormatConfig extends FormConfig {
  rows: Array<{ cols: Array<FormChild> }>
}
