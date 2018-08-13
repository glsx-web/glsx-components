<template>
  <el-checkbox-button 
    v-model="model_"
    :label="checkboxButton.label || label"
    :true-label='checkboxButton.trueLabel || trueLabel'
    :false-label='checkboxButton.falseLabel || falseLabel'
    :disabled="checkboxButton.disabled || disabled"
    :name='checkboxButton.name || name'
    :checked='checkboxButton.checked || checked'
    :indeterminate='checkboxButton.indeterminate || indeterminate'
  >
    <slot></slot>
  </el-checkbox-button>
</template>

<script>
    export default {
      name: 'GlCheckboxButton',
      data() {
        return {
          model_: this.value,
          change_: this.checkboxButton.change === undefined ? this.change === undefined ? _ => null : this.change : this.checkboxButton.change
        }
      },
      props: {
        value: {
          type: null
        },
        checkboxButton: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        model: {
          type: Boolean
        },
        change: {
          type: Function
        },
        label: {
          type: [String, Number, Boolean]
        },
        trueLabel: {
          type: [String, Number]
        },
        falseLabel: {
          type: [String, Number]
        },
        disabled: {
          type: Boolean,
          default: false
        },
        name: {
          type: String
        },
        checked: {
          type: Boolean,
          default: false
        },
        indeterminate: {
          type: Boolean,
          default: false
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
