<template>
  <el-checkbox
    v-model="model_"
    :label="checkbox.label || label"
    :true-label='checkbox.trueLabel || trueLabel'
    :false-label='checkbox.falseLabel || falseLabel'
    :disabled="checkbox.disabled || disabled"
    :border='checkbox.border || border'
    :size='checkbox.size || size'
    :name='checkbox.name || name'
    :checked='checkbox.checked || checked'
    :indeterminate='checkbox.indeterminate || indeterminate'
    @change="change"
  >
    <slot></slot>  
  </el-checkbox>
</template>

<script>
    export default {
      name: 'GlCheckbox',
      data() {
        return {
          model_: this.value
        }
      },
      props: {
        value: {
          type: null
        },
        checkbox: {
          type: Object,
          default: _ => {
            return {}
          }
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
          type: Boolean
        },
        border: {
          type: Boolean
        },
        size: {
          type: String
        },
        name: {
          type: String
        },
        checked: {
          type: Boolean
        },
        indeterminate: {
          type: Boolean
        }
      },
      watch: {
        value(val) {
          this.model_ = val
        }
      },
      methods: {
        change(val) {
          this.$emit('input', val)
          this.$emit('change', val)
          this.$emit('blur', val)
          this.$emit('focus', val)
        }
      }
    }
</script>