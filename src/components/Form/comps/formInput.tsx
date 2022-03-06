import _cloneDeep from 'lodash/cloneDeep'
import { FormChild } from '../types'
import { ElInput } from 'element-plus'
import { defaultTypeAttrs, defaultInputAttrs } from '../tools/default'

const formInput = (col: FormChild, values: { [propName: string]: unknown }) => {
  const { key, on = {}, slots = [], typeAttrs } = col

  return (
    <ElInput
      v-model={values[key]}
      title={values[key] as string}
      {...on}
      v-slots={slots}
      {...{ attrs: Object.assign(_cloneDeep(defaultTypeAttrs), defaultInputAttrs(col), typeAttrs) }}
    />
  )
}

export default formInput
