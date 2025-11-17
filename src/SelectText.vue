<template>
  <span class="complex-select-text" :style="style" >{{ !format ? value ? value.label : missValue : format(value) }}</span>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue"
import { dataConfig } from "complex-data"
import { SelectValueType } from "complex-data/src/lib/SelectValue"

export default defineComponent({
  name: 'SelectText',
  props: {
    value: {
      type: Object as PropType<SelectValueType>,
      required: false
    },
    color: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    format: {
      type: Function as PropType<(value?: SelectValueType) => string>,
      required: false
    },
    missValue: {
      type: String,
      required: false,
      default: ''
    },
    emptyValue: {
      type: String,
      required: false,
      default: ''
    },
  },
  computed: {
    style() {
      if (this.value && this.color) {
        return {
          color: this.disabled ? dataConfig.style.color.disabled : this.value.$color ? dataConfig.style.color[this.value.$color] : this.value.color ? this.value.color : this.value.disabled ? dataConfig.style.color.disabled : undefined
        }
      }
    }
  },
  methods: {
    currentText() {
      const value = this.value
      const format = this.format
      return !format ? value ? value.label : this.missValue : format(value) ?? this.emptyValue
    }
  }
})
</script>
