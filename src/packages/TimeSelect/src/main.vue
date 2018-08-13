<template>
  <el-time-select
      v-model="model_"
      :picker-options="timeSelect.pickerOptions || pickerOptions"
      :placeholder="timeSelect.placeholder || placeholder"
      :range-separator="timeSelect.rangeSeparator || rangeSeparator"
      :start-placeholder="timeSelect.startPlaceholder || startPlaceholder"
      :end-placeholder="timeSelect.endPlaceholder || endPlaceholder"
      :readonly='timeSelect.readonly || readonly'
      :disabled='timeSelect.disabled || disabled'
      :editable='timeSelect.editable || editable'
      :clearable='timeSelect.clearable || clearable'
      :size='timeSelect.size || size'
      :align='timeSelect.align || align'
      :popper-class='timeSelect.popperClass || popperClass'
      :default-value='timeSelect.defaultValue || defaultValue'
      :prefix-icon='timeSelect.prefixIcon || prefixIcon'
      :clear-icon='timeSelect.clearIcon || clearIcon'
      :value-format='timeSelect.valueFormat || valueFormat'
      :value='timeSelect.value || value'
      :name='timeSelect.name || name'
  >
  </el-time-select>
</template>

<script>
    export default {
      name: 'GlTimeSelect',
      props: {
        timeSelect: {
          type: Object,
          default: () => {
            return {}
          }
        },
        readonly: {
          type: Boolean,
          default: false
        },
        disabled: {
          type: Boolean,
          default: false
        },
        editable: {
          type: Boolean,
          default: true
        },
        clearable: {
          type: Boolean,
          default: true
        },
        size: {
          type: String
        },
        placeholder: {
          type: String
        },
        startPlaceholder: {
          type: String
        },
        endPlaceholder: {
          type: String
        },
        value: {
          type: null
        },
        align: {
          type: String,
          default: 'left'
        },
        popperClass: {
          type: String
        },
        pickerOptions: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        rangeSeparator: {
          type: String
        },
        valueFormat: {
          type: String
        },
        defaultValue: {
          type: String
        },
        name: {
          type: String
        },
        prefixIcon: {
          type: String,
          default: 'el-icon-time'
        },
        clearIcon: {
          type: String,
          default: 'el-icon-circle-close'
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
