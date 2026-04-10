import { defineComponent, h, PropType, VNode } from "vue"
import { Input, InputNumber, Textarea, Switch, Select, Divider, Cascader, DatePicker, RangePicker } from "ant-design-vue"
import { camelToLine } from "complex-utils"
import { dataConfig } from "complex-data"
import type { DictionaryEditMod } from "complex-data/src/lib/DictionaryValue"
import PaginationView from "./../components/PaginationView"
import type { AutoItemPayloadType } from "./AutoItem"
import EditView from "../EditView"
import SingleImport from "../SingleImport"
import MultipleImport from "../MultipleImport"
import { parseEditAttrs } from "../../format"
import antdConfig from "../../antdConfig"

export default defineComponent({
  name: 'AutoEditItem',
  props: {
    payload: {
      type: Object as PropType<AutoItemPayloadType<'edit'>>,
      required: true
    }
  },
  /**
   * 主要模板
   * @returns {VNode}
   */
  render() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tag: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let children: any = undefined
    const target = this.payload.target as DictionaryEditMod
    const targetAttrs = parseEditAttrs(target, this.payload)!
    targetAttrs.pushClass('complex-edit-item')
    targetAttrs.pushClass('complex-edit-item-' + camelToLine(target.type, '-'))
    targetAttrs.merge(antdConfig.componentConfig.parseData(target.$local, 'target'))
    let item = null
    if (!(this.payload.parent as InstanceType<typeof EditView>).gridParse && target.$width) {
      targetAttrs.style.width = typeof target.$width === 'number' ? dataConfig.formatPixel(target.$width) : target.$width
    }
    const targetRender = antdConfig.componentConfig.parseData(target.$renders, 'target')
    const option = antdConfig.componentConfig.parseAttrs(targetAttrs)
    // 考虑一个默认的值，inline模式下和其他模式下的默认值，避免出现问题
    if (targetRender) {
      item = targetRender({
        ...this.payload,
        option: option
      })
    } else if (target.type === 'input') {
      tag = Input
    } else if (target.type === 'inputNumber') {
      tag = InputNumber
    } else if (target.type === 'textArea') {
      tag = Textarea
    } else if (target.type === 'switch') {
      tag = Switch
    } else if (target.type === 'select') {
      tag = Select
      const $data = target
      children = {}
      const dropdownRender = antdConfig.componentConfig.parseData(target.$renders, 'dropdown')
      const optionRender = antdConfig.componentConfig.parseData(target.$renders, 'option')
      const tagRender = antdConfig.componentConfig.parseData(target.$renders, 'tag')
      if (dropdownRender) {
        children.dropdownRender = dropdownRender
      } else {
        const dropdownTopRender = antdConfig.componentConfig.parseData(target.$renders, 'dropdownTop')
        const dropdownBottomRender = antdConfig.componentConfig.parseData(target.$renders, 'dropdownBottom')
        if (dropdownTopRender || $data.$pagination || dropdownBottomRender) {
          children.dropdownRender = (payload: { menuNode: VNode }) => {
            const vNodes = [payload.menuNode]
            if (dropdownTopRender) {
              vNodes.unshift(dropdownTopRender({
                payload: this.payload
              }) as VNode)
              vNodes.unshift(h(Divider, {
                style: {
                  margin: '4px 0'
                }
              }))
            }
            if (dropdownBottomRender) {
              vNodes.push(h(Divider, {
                style: {
                  margin: '4px 0'
                }
              }))
              vNodes.push(dropdownBottomRender({
                payload: this.payload
              }) as VNode)
            }
            if ($data.$pagination) {
              vNodes.push(h(Divider, {
                style: {
                  margin: '4px 0'
                }
              }))
              vNodes.push(h(PaginationView, {
                pagination: $data.$pagination,
                simple: true,
                onPage() {
                  ($data.$option as any).open = true
                  $data.loadData(true).then(() => {
                    ($data.$option as any).open = undefined
                  }, () => {
                    ($data.$option as any).open = undefined
                  })
                },
                onSize() {
                  ($data.$option as any).open = true
                  $data.loadData(true).then(() => {
                    ($data.$option as any).open = undefined
                  }, () => {
                    ($data.$option as any).open = undefined
                  })
                },
                onClick(e: Event) {
                  e.preventDefault()
                }
              }))
              const dropdownPaginationBottomRender = antdConfig.componentConfig.parseData(target.$renders, 'dropdownPaginationBottom')
              if (dropdownPaginationBottomRender) {
                vNodes.push(h(Divider, {
                  style: {
                    margin: '4px 0'
                  }
                }))
                vNodes.push(dropdownPaginationBottomRender({
                  payload: this.payload
                }) as VNode)
              }
            }
            return vNodes
          }
        }
      }
      if (optionRender) {
        children.option = optionRender
      }
      if (tagRender) {
        children.tagRender = tagRender
      }
    } else if (target.type === 'cascader') {
      tag = Cascader
    } else if (target.type === 'date') {
      tag = DatePicker
    } else if (target.type === 'dateRange') {
      tag = RangePicker
    } else if (target.type === 'file') {
      if (!target.multiple) {
        tag = SingleImport
      } else {
        tag = MultipleImport
      }
    } else if (target.type === 'custom') {
      tag = target.$custom
    } else if (target.type === 'form') {
      tag = EditView
    }
    if (tag) {
      item = h(tag, option, children)
    }
    return item
  }
})
