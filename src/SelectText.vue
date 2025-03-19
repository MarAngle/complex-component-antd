<template>
  <span class="complex-select-text" :style="style" >{{ value ? value[prop] : missValue }}</span>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue"
import { SelectValueType } from "complex-data/src/lib/SelectValue"
import config from "../config"

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
    prop: {
      type: [String, Number, Symbol] as PropType<PropertyKey>,
      required: false,
      default: 'label'
    },
    missValue: {
      type: String,
      required: false,
      default: ''
    },
  },
  computed: {
    style() {
      if (this.value) {
        if (this.value.color && this.color) {
          return {
            color: this.value.color
          }
        }
        if (this.disabled && this.value.disabled) {
          return {
            color: config.style.color.disabled
          }
        }
      }
    }
  }
})
</script>
