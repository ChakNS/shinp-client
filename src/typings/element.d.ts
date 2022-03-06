import { VNodeChild } from '@vue/runtime-core'
import { HTMLAttributes } from '@vue/runtime-dom'

export type JsxNode = VNodeChild | JSX.Element

export interface SlotDirective {
  [name: string]: () => JsxNode
}

type JsxComponentCustomProps = {
  vModel?: unknown
  vModels?: unknown[]
  vCustom?: unknown[]
  vShow?: boolean
  vHtml?: JsxNode
  vSlots?: SlotDirective
  on?: {
    [name: string]: Function
  }
} & Omit<HTMLAttributes, 'innerHTML'> & {
    innerHTML?: JsxNode
  }

declare module '@vue/runtime-core' {
  interface ComponentCustomProps extends JsxComponentCustomProps {
    onClick?: () => any
    vSlots?: {
      [eleName: string]: JSX.Element
    }
    // [eleName: string]: any;
  }
}
