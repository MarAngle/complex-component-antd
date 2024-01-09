import { defineComponent, h, PropType } from "vue"
import { Button } from "ant-design-vue"
import { ButtonType } from "ant-design-vue/es/button"
import { notice } from "complex-plugin"
import { FileView } from "complex-component"
import icon from "../../../icon"
import { ImportProps } from "../../ImportView"

export default defineComponent({
  name: 'MultipleFile',
  props: {
    value: {
      type: Object as PropType<File[]>
    },
    name: {
      type: String,
      required: false,
      default: '上传'
    },
    type: {
      type: String,
      required: false
    },
    icon: {
      type: [String, Function],
      required: false,
      default: 'upload'
    },
    render: {
      type: Object as PropType<ImportProps['render']>,
      required: false
    },
    loading: {
      type: Boolean,
      required: false
    },
    accept: {
      type: String,
      required: false
    },
    size: { // MB
      type: Number,
      required: false
    },
    multiple: {
      type: Object as PropType<ImportProps['multiple']>,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    }
  },
  watch: {
    value: function(value) {
      this.syncData(value)
    }
  },
  computed: {
    max() {
      if (this.multiple) {
        return this.multiple.max || 0
      } else {
        return 0
      }
    }
  },
  data() {
    return {
      operate: false,
      data: this.value || []
    }
  },
  methods: {
    syncData(file: undefined | File[]) {
      this.setData(file, false, false)
    },
    setData(file: undefined | File[], append?: boolean, emit?: boolean) {
      if (this.data !== file) {
        if (!append) {
          this.data = file || []
        } else if (!file) {
          // append模式下file无值不做操作
        } else {
          file.forEach(fileItem => {
            if (this.data.indexOf(fileItem) === -1) {
              this.data.push(fileItem)
            }
          })
          if (this.max && this.data.length > this.max) {
            this.data.length = this.max
            notice.showMsg(`当前选择的文件数量超过限制值${this.max}，超过部分已被删除！`, 'error')
          }
        }
        if (emit) {
          this.emitData()
        }
      }
    },
    removeData(index: number) {
      this.data.splice(index, 1)
      this.emitData()
    },
    emitData() {
      this.$emit('change', this.data)
    },
    renderFile() {
      let disabled = this.disabled
      if (this.max && this.data.length >= this.max) {
        disabled = true
      }
      return h(FileView, {
        class: 'complex-import-multiple-file-file',
        ref: 'file',
        accept: this.accept,
        multiple: this.multiple,
        disabled: disabled,
        size: this.size,
        onFile: (file: File[]) => {
          this.setData(file, true, true)
        }
      })
    },
    renderMenu() {
      return h(Button, {
        class: 'complex-import-multiple-file-menu',
        loading: this.loading || this.operate,
        type: this.type === 'danger' ? 'primary' : this.type as ButtonType,
        danger: this.type === 'danger',
        icon: icon.parse(this.icon as ImportProps['icon']),
        disabled: this.disabled,
        onClick: () => {
          (this.$refs.file as InstanceType<typeof FileView>).$el.click()
        }
      }, {
        default: () => this.name
      })
    },
    renderList() {
      return h('div', {
        class: 'complex-import-multiple-file-list'
      }, {
        default: () => this.data.map((file, index) => {
          return this.renderContent(file, index)
        })
      })
    },
    renderContent(file: File, index: number) {
      return this.data ? h('div', {
        class: 'complex-import-multiple-file-item'
      }, {
        default: () => [
          h('span', {
            class: 'complex-import-multiple-file-item-name'
          }, {
            default: () => file.name
          }),
          h('span', {
            class: 'complex-import-multiple-file-item-delete',
            onClick: () => {
              this.removeData(index)
            }
          }, {
            default: () => icon.parse('close')
          }),
        ]
      }) : null
    }
  },
  render() {
    return h('div', {
      class: 'complex-import-multiple-file'
    }, {
      default: () => [
        this.renderFile(),
        this.renderMenu(),
        this.renderList()
      ]
    })
  }
})
