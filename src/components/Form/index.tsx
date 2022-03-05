import { computed, watch, reactive, defineComponent, PropType } from 'vue'
import { FormConfig } from './types'
import { groupingFormItem, groupingValues } from './tools/format'
import { defaultFormAttrs, defaultRowAttrs } from './tools/default'
import _cloneDeep from 'lodash/cloneDeep'

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
      newVal =>
        (buildedValues = Object.assign(groupingValues(newVal), buildedValues)),
      { immediate: true, deep: true }
    )

    return () => (
      <>
        {props.config.map(column => {
          const { title, formAttrs, rowAttrs } = column
          const jointFormAttrs = Object.assign(
            _cloneDeep(defaultFormAttrs),
            formAttrs
          )
          const jointRowAttrs = Object.assign(
            _cloneDeep(defaultRowAttrs),
            rowAttrs
          )
          const unfold =
            typeof column.unfold === 'boolean' ? column.unfold : true
          const contentStyle = unfold
            ? {}
            : {
                height: 0,
                overflow: 'hidden',
                padding: '0 16px',
                marginBottom: '16px',
              }

          return <>{title && <div>{title}</div>}</>
        })}
      </>
    )
  },
})
