import { computed, watch, reactive, defineComponent, PropType } from 'vue'
import { FormConfig } from './types'
import { groupingFormItem, groupingValues } from './tools/format'

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<Array<FormConfig>>,
      required: true,
    },
  },
  setup() {
    return () => (
      <>
        <span>111</span>
      </>
    )
  },
})
