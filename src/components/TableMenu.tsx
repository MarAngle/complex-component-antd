import { defineComponent, h, PropType } from "vue"
import { camelToLine, debounce } from "complex-utils"
import type { MenuValue } from "complex-data/type"
import DefaultMod from "complex-data/src/dictionary/DefaultMod"
import type { tablePayload } from "../TableView"
import antdConfig from "../../antdConfig"

export interface TableMenuValue extends MenuValue<never, [tablePayload<DefaultMod>]> {
  color?: string
  class?: string[] | ((payload: tablePayload<DefaultMod>) => string[])
  option?: Record<string, unknown>
  children?: TableMenuValue[]
}

export default defineComponent({
  name: 'TableMenu',
  props: {
    list: {
      type: Object as PropType<TableMenuValue[]>,
      required: true
    },
    payload: {
      type: Object as PropType<tablePayload<DefaultMod>>,
      required: true
    }
  },
  methods: {
    renderList(menuList: TableMenuValue[], payload: tablePayload<DefaultMod>) {
      return menuList.map((menuItem) => {
        let hidden = menuItem.hidden
        if (hidden) {
          if (typeof hidden === 'function') {
            hidden = hidden(payload)
          }
          if (hidden) {
            return null
          }
        }

        let disabled = menuItem.disabled
        if (disabled && typeof disabled === "function") {
          disabled = disabled(payload)
        }

        let classList = ["complex-table-menu-item"]
        if (menuItem.color) {
          classList.push("complex-color-" + camelToLine(menuItem.color, "-"))
        }
        if (disabled) {
          classList.push("complex-disabled complex-color-disabled")
        }
        if (menuItem.class) {
          classList = classList.concat(typeof menuItem.class === "function" ? menuItem.class(payload) : menuItem.class)
        }

        const onClick = (e: MouseEvent) => {
          if (menuItem.modifiers) {
            if (menuItem.modifiers.includes('.stop')) {
              e.stopPropagation()
            }
            if (menuItem.modifiers.includes('.prevent')) {
              e.preventDefault()
            }
          }
          antdConfig.parseMenuConfirm(menuItem.confirm, () => {
            this.$emit("menu", menuItem.prop, payload);
          })
        }

        return h(
          "span",
          {
            class: classList.join(" "),
            onClick: menuItem.debounce ? debounce(onClick, menuItem.debounce, true) : onClick,
            ...menuItem.option,
          },
          { default: () => menuItem.name }
        )
      })
    },
  },
  /**
   * 主要模板

   * @returns {VNode}
   */
  render() {
    return h('span', {
      class: 'complex-table-menu'
    }, {
      default: () => this.renderList(this.list, this.payload)
    })
  }
})
