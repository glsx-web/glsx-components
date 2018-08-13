<template>
  <el-tooltip
      v-model="model_"
      :effect='tooltip.effect || effect'
      :content='tooltip.content || content'
      :placement='tooltip.placement || placement'
      :value='tooltip.value || value'
      :disabled='tooltip.disabled || disabled'
      :offset='tooltip.offset || offset'
      :transition='tooltip.transition || transition'
      :visible-arrow='tooltip.visibleArrow || visibleArrow'
      :popper-options='tooltip.popperOptions || popperOptions'
      :open-delay='tooltip.openDelay || openDelay'
      :manual='tooltip.manual || manual'
      :popper-class='tooltip.popperClass || popperClass'
      :enterable='tooltip.enterable || enterable'
      :hide-after='tooltip.hideAfter || hideAfter'
  >
    <slot></slot>
    <slot name='content' slot="content"></slot>
  </el-tooltip>
</template>

<script>
    export default {
      name: 'GlTooltip',
      props: {
        tooltip: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        effect: {
          type: String,
          default: 'dark'
        },
        content: {
          type: String
        },
        placement: {
          type: String,
          default: 'bottom'
        },
        value: {
          type: Boolean
        },
        disabled: {
          type: Boolean,
          default: false
        },
        offset: {
          type: Number,
          default: 0
        },
        transition: {
          type: String,
          default: 'el-fade-in-linear'
        },
        visibleArrow: {
          type: Boolean,
          default: true
        },
        popperOptions: {
          type: Object,
          default: _ => {
            return {
              boundariesElement: 'body',
              gpuAcceleration: false
            }
          }
        },
        openDelay: {
          type: Number,
          default: 0
        },
        manual: {
          type: Boolean,
          default: false
        },
        popperClass: {
          type: String
        },
        enterable: {
          type: Boolean,
          default: true
        },
        hideAfter: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
          model_: this.value
        }
      },
      watch: {
        model_(val) {
          this.$emit('input', val)
          this.$emit('change', val)
          this.$emit('blur', val)
          this.$emit('focus', val)
        },
        value(val) {
          this.model_ = val
        }
      }
    }
</script>
