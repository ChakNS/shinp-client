/* eslint-disable prettier/prettier */
export interface FormChild {
  type: string
  key: string
  defaultValue: unknown
}

export interface FormConfig {
  title: string
  children: Array<FormChild>
}
