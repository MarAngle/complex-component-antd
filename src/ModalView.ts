import { defineComponent, h, PropType } from "vue"
import { Modal, ModalProps } from "ant-design-vue"
import { deepCloneData, updateData } from "complex-utils"
import { layout } from "complex-plugin"
import { DefaultEditButtonGroupOption } from "complex-data/src/dictionary/DefaultEditButtonGroup"
import ButtonView from "./ButtonView"
import config from "../config"

export type modalLayoutOption = {
  type: 'auto' | 'fixed'
  top: number
  bottom: number
  header: number
  menu: number
  padding: [number, number, number, number]
  mainPadding: [number, number, number, number]
}

export default defineComponent({
  name: 'ModalView',
  props: {
    width: {
      type: Number,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    layout: {
      type: Object as PropType<Partial<modalLayoutOption>>,
      required: false,
      default: () => {
        return null
      }
    },
    menu: {
      type: Object as PropType<(string | DefaultEditButtonGroupOption)[]>,
      required: false
    },
    menuOption: {
      type: Object as PropType<Record<string, DefaultEditButtonGroupOption>>,
      required: false,
      default: () => {
        return null
      }
    },
    submit: {
      type: Function as PropType<() => Promise<unknown>>,
      required: false
    },
    modalOption: {
      type: Object as PropType<ModalProps>,
      required: false,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      open: false,
      layoutPlugin: layout,
      localTitle: undefined as undefined | string,
      localModalOption: undefined as undefined | ModalProps
    }
  },
  computed: {
    currentTitle() {
      return this.localTitle || this.title
    },
    currentLayout() {
      return updateData(deepCloneData(config.modal.layout), this.layout)
    },
    menuList() {
      let menuList: DefaultEditButtonGroupOption[]
      const close = () => {
        this.hide('close')
      }
      const submit = () => {
        if (this.submit) {
          return new Promise((resolve, reject) => {
            this.submit!().then(() => {
              this.hide('submit')
              resolve({ status: 'success' })
            }).catch(err => {
              reject(err)
            })
          })
        } else {
          console.error('submit按钮需要定义对应的submit函数')
        }
      }
      if (!this.menu) {
        menuList = [
          config.modal.getMenu('close', {
            click: close
          })
        ]
      } else {
        menuList = this.menu.map(menu => {
          if (typeof menu !== 'object') {
            const menuOption = this.menuOption ? this.menuOption[menu] : undefined
            if (menu === 'close' || menu === 'cancel') {
              return config.modal.getMenu(menu, {
                ...menuOption,
                click: close
              })
            } else if (menu === 'submit') {
              return config.modal.getMenu(menu, {
                ...menuOption,
                click: submit
              })
            } else {
              return config.modal.getMenu(menu, {
                ...menuOption,
              })
            }
          } else {
            return menu
          }
        })
      }
      return menuList
    },
    currentWidth() {
      if (!this.width) {
        return config.modal.width
      } else {
        return this.width
      }
    },
    contentHeight() {
      const mainHeight = this.layoutPlugin.body.height
      let height = mainHeight - this.currentLayout.top - this.currentLayout.bottom - this.currentLayout.header - this.currentLayout.padding[0] - this.currentLayout.padding[2] - this.currentLayout.mainPadding[0] - this.currentLayout.mainPadding[2]
      if (this.menuList.length > 0) {
        height = height - this.currentLayout.menu
      }
      return height
    },
    contentWidth() {
      return this.currentWidth - this.currentLayout.padding[1] - this.currentLayout.padding[3] - this.currentLayout.mainPadding[1] - this.currentLayout.mainPadding[3]
    }
  },
  methods: {
    show(title?: string, option?: ModalProps) {
      this.localTitle = title
      this.localModalOption = option
      this.open = true
    },
    hide(from: string) {
      this.open = false
      this.$emit('hide', from)
      this.localTitle = undefined
      this.localModalOption = undefined
    },
    renderContent() {
      return this.$slots.default!({
        width: this.contentWidth,
        height: this.contentHeight,
        modal: this
      })
    },
    onMenu(prop: string) {
      this.$emit('menu', prop, this)
    },
    renderFooter() {
      if (this.menuList.length > 0) {
        return this.menuList.map(item => {
          if (!item.render) {
            const onClick = item.click
            return h(ButtonView, {
              data: {
                ...item,
                click: payload => {
                  this.onMenu(item.prop)
                  if (onClick) {
                    return onClick(payload)
                  }
                }
              }
            })
          } else {
            return item.render({
              modal: this,
              menuList: this.menuList,
              menu: item
            })
          }
        })
      } else {
        return null
      }
    }
  },
  render() {
    const top = config.component.data.formatPixel(this.currentLayout.top)
    const padding = this.currentLayout.padding.map(num => config.component.data.formatPixel(num)).join(' ')
    interface ModalPropsWithClass extends ModalProps {
      class: string
    }
    const props: ModalPropsWithClass = {
      class: 'complex-modal',
      open: this.open,
      width: this.currentWidth,
      title: this.currentTitle,
      ...this.modalOption,
      ...this.localModalOption,
      onCancel: (e: MouseEvent | KeyboardEvent) => {
        if (e instanceof KeyboardEvent) {
          this.hide('escape')
        } else {
          const target = e.target as HTMLDivElement
          if (target.classList.contains('ant-modal-wrap')) {
            this.hide('mask')
          } else {
            this.hide('modal')
          }
        }
      }
    }
    if (this.menuList.length === 0) {
      props.footer = null
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(props as any).style) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props as any).style = {
        top: top
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (props as any).style.top = top
    }
    if (!props.bodyStyle) {
      props.bodyStyle = {
        padding: padding
      }
    } else {
      props.bodyStyle.padding = padding
    }
    const render = h(Modal, props, {
      default: () => [this.renderContent()],
      footer: () => this.renderFooter()
    })
    return render
  }
})