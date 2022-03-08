import _cloneDeep from 'lodash/cloneDeep'
import { FormChild } from '../types'
import { ElInput } from 'element-plus'
import { defaultTypeAttrs, defaultInputAttrs } from '../tools/default'

const formInput = (col: FormChild, values: { [propName: string]: unknown }) => {
  const { key, on = {}, slots = [], typeAttrs } = col
  const inputAttrs: Readonly<{}> = Object.assign(_cloneDeep(defaultTypeAttrs), defaultInputAttrs(col), typeAttrs)

  return <ElInput v-model={values[key]} title={values[key] as string} v-slots={slots} {...inputAttrs} {...on} />
}

export default formInput
