<template>
  <svg t="1743059212679" class="complex-local-icon complex-local-icon-empty-image" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3040" xmlns:xlink="http://www.w3.org/1999/xlink" :width="size" :height="size">
    <path :fill="color" d="M128 832V512h64v146.752l192-192L749.248 832H832V192H512V128h320a64 64 0 0 1 64 64v640a64 64 0 0 1-64 64H192a64 64 0 0 1-64-64z m256-274.752l-192 192V832h466.752L384 557.248z" p-id="3041"></path>
    <path :fill="color" d="M768 384a128 128 0 1 1-256 0 128 128 0 0 1 256 0z m-64 0a64 64 0 1 0-128 0 64 64 0 0 0 128 0zM402.048 355.84l-45.248 45.184-90.496-90.496-90.496 90.496-45.312-45.248 90.56-90.496-90.56-90.496 45.312-45.248L266.24 220.032l90.496-90.496 45.248 45.248-90.496 90.496 90.496 90.496z" p-id="3042"></path>
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { localIconProps } from "../../type"
import antdConfig from "../../antdConfig"

export default defineComponent({
  name: 'EmptyImage',
  props: {
    size: {
      type: Number as PropType<localIconProps['size']>,
      required: false,
      default: 128
    },
    color: {
      type: String as PropType<localIconProps['color']>,
      required: false,
      default: () => {
        return antdConfig.dataConfig.style.color.disabled
      }
    }
  }
})
</script>