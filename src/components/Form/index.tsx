import { computed, watch, reactive, defineComponent, PropType } from 'vue'
import { FormConfig } from './types'
import { groupingFormItem, groupingValues } from './tools/format'
import { defaultFormAttrs, defaultRowAttrs } from './tools/default'
import _cloneDeep from 'lodash/cloneDeep'
import { ElForm, ElRow } from 'element-plus'
import { formItem } from './tools/mixin'
import { useExpose } from '@/use/use-expose'
import classes from './index.module.scss'
import { createNamespace } from '@/utils'

const [name, bem] = createNamespace('form')

export default defineComponent({
  name,
  props: {
    config: {
      type: Object as PropType<Array<FormConfig>>,
      required: true,
    },
  },
  setup(props) {
    let buildedValues = reactive({})
    const groupedConfig = computed(() => groupingFormItem(props.config))
    watch(
      () => props.config,
      newVal => (buildedValues = reactive(Object.assign(groupingValues(newVal), buildedValues))),
      { immediate: true, deep: true }
    )

    const getValues = () => buildedValues

    useExpose({ getValues })

    return () => (
      <>
        {groupedConfig.value.map(column => {
          const { title, formAttrs, rowAttrs } = column
          const jointFormAttrs = Object.assign(_cloneDeep(defaultFormAttrs), formAttrs)
          const jointRowAttrs = Object.assign(_cloneDeep(defaultRowAttrs), rowAttrs)

          return (
            <>
              {title && <div class={bem('column-title')}>{title}</div>}
              <ElForm {...{ attrs: { ...jointFormAttrs, model: buildedValues } }} ref="form">
                {column.rows.map(row => (
                  <ElRow {...jointRowAttrs}>{formItem(row, buildedValues)}</ElRow>
                ))}
              </ElForm>
            </>
          )
        })}
      </>
    )
  },
})
