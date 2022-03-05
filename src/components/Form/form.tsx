import { computed, watch, reactive, defineComponent, PropType } from 'vue'
import { FormConfig } from './types'
import { groupingFormItem, groupingValues } from './tools/format'
import { defaultFormAttrs, defaultRowAttrs } from './tools/default'
import _cloneDeep from 'lodash/cloneDeep'
import { ElForm, ElRow } from 'element-plus'
import { formItem } from './tools/mixin'

export default defineComponent({
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
      newVal => {
        buildedValues = reactive(Object.assign(groupingValues(newVal), buildedValues))
        console.log('uuuuu')
      },
      { immediate: true, deep: true }
    )

    return () => (
      <>
        {groupedConfig.value.map(column => {
          const { title, formAttrs, rowAttrs } = column
          const jointFormAttrs = Object.assign(_cloneDeep(defaultFormAttrs), formAttrs)
          const jointRowAttrs = Object.assign(_cloneDeep(defaultRowAttrs), rowAttrs)
          const unfold = typeof column.unfold === 'boolean' ? column.unfold : true

          return (
            <>
              {title && <div>{title}</div>}
              <ElForm {...{ attrs: { ...jointFormAttrs, model: buildedValues } }} ref="form">
                {column.rows.map(row => (
                  <ElRow>{formItem(row, buildedValues)}</ElRow>
                ))}
              </ElForm>
            </>
          )
        })}
      </>
    )
  },
})
