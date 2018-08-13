<template>
  <el-popover
      v-model="model_"
      :trigger='popover.trigger || trigger'
      :title='popover.title || title'
      :content='popover.content || content'
      :width='popover.width || width'
      :placement='popover.placement || placement'
      :disabled='popover.disabled || disabled'
      :value='popover.value || value'
      :offset='popover.offset || offset'
      :transition='popover.transition || transition'
      :visible-arrow='popover.visibleArrow || visibleArrow'
      :popper-options='popover.popperOptions || popperOptions'
      :popper-class='popover.popperClass || popperClass'
      :open-delay='popover.openDelay || openDelay'
      @show='show'
      @after-enter='afterEnter'
      @hide='hide'
      @after-leave='afterLeave'
      >    
      <slot></slot>
      <slot name="reference" slot='reference'></slot>  
  </el-popover>
</template>

<script>
    export default {
      name: 'GlPopover',
      data() {
        return {
          model_: this.value
        }
      },
      props: {
        popover: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        trigger: {
          type: String,
          default: 'click'
        },
        title: {
          type: String
        },
        content: {
          type: String,
          default: '666'
        },
        width: {
          type: [String, Number]
        },
        placement: {
          type: String,
          dafaule: 'bottom'
        },
        disabled: {
          type: Boolean,
          default: false
        },
        value: {
          type: Boolean,
          default: false
        },
        offset: {
          type: Number,
          default: 0
        },
        transition: {
          type: String,
          default: 'fade-in-linear'
        },
        visibleArrow: {
          type: Boolean,
          default: true
        },
        popperOptions: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        popperClass: {
          type: String
        },
        openDelay: {
          type: Number
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
      },
      methods: {
        show(val) {
          this.$emit('show', val)
        },
        afterEnter(val) {
          this.$emit('after-enter', val)
        },
        hide(val) {
          this.$emit('hide', val)
        },
        afterLeave(val) {
          this.$emit('after-leave', val)
        }
      }
    }
</script>
