import { defineComponent, h, PropType, VNode } from "vue"
import ModalView, { ModalViewProps } from "./ModalView"
import icon from "../icon"
import antdConfig from "../antdConfig"
import { localIconProps } from "../type"

type renderType = (payload: localIconProps) => VNode | VNode[]

export default defineComponent({
  name: 'ImageViewer',
  props: {
    src: {
      type: String,
      required: false
    },
    width: {
      type: Number,
      required: false,
      default: 100
    },
    height: {
      type: Number,
      required: false
    },
    modal: {
      type: Object as PropType<ModalViewProps>,
      required: false
    },
    emptyRender: {
      type: Function as PropType<renderType>,
      required: false
    },
    errorRender: {
      type: Function as PropType<renderType>,
      required: false
    }
  },
  data() {
    return {
      isError: false
    }
  },
  computed: {
    currentHeight() {
      return this.height || this.width
    },
    currentSize() {
      return this.width >= this.currentHeight ? this.width : this.currentHeight
    }
  },
  watch: {
    // 监听src变化，重置加载状态
    src(val) {
      if (val) {
        this.isError = false
      }
    }
  },
  methods: {
    renderImage() {
      if (this.src && !this.isError) {
        return h('img', {
          class: this.modal ? 'complex-image-viewer-content complex-image-viewer-content-has-modal' : 'complex-image-viewer-content',
          src: this.src,
          onError: () => {
            this.isError = true
          },
          onClick: this.modal ? () => {
            (this.$refs.modal as InstanceType<typeof ModalView>).show()
          } : undefined
        })
      } else if (this.isError) {
        return h('div', {
          class: 'complex-image-viewer-error'
        }, [
          !this.errorRender ? icon.local('errorImage', { size: this.currentSize }) : this.errorRender({ size: this.currentSize })
        ])
      } else {
        return h('div', {
          class: 'complex-image-viewer-empty'
        }, [
          !this.emptyRender ? icon.local('emptyImage', { size: this.currentSize }) : this.emptyRender({ size: this.currentSize })
        ])
      }
    },
    renderModal() {
      if (this.modal) {
        return h(ModalView, {
          ref: 'modal',
          title: '图片查看',
          ...this.modal
        }, {
          default: ({ width }: { width: number }) => {
            const currentWidth = antdConfig.dataConfig.formatPixel(width)
            return h('img', {
              src: this.src,
              style: {
                width: currentWidth,
                height: 'auto'
              }
            })
          }
        })
      }
    }
  },
  render() {
    const width = antdConfig.dataConfig.formatPixel(this.width)
    const height = antdConfig.dataConfig.formatPixel(this.currentHeight)
    return h('div', {
      class: 'complex-image-viewer',
      style: {
        width: width,
        height: height
      }
    }, [
      this.renderImage(),
      this.renderModal()
    ])
  }
})