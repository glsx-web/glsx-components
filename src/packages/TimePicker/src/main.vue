<template>
  <el-time-picker
    :is-range='timePicker.isRange || isRange'
    v-model="model_"
    :picker-options="timePicker.pickerOptions || pickerOptions"
    :placeholder="timePicker.placeholder || placeholder"
    :arrow-control='timePicker.arrowControl || arrowControl'
    :range-separator="timePicker.rangeSeparator || rangeSeparator"
    :start-placeholder="timePicker.startPlaceholder || startPlaceholder"
    :end-placeholder="timePicker.endPlaceholder || endPlaceholder"
    :readonly='timePicker.readonly || readonly'
    :disabled='timePicker.disabled || disabled'
    :editable='timePicker.editable || editable'
    :clearable='timePicker.clearable || clearable'
    :size='timePicker.size || size'
    :align='timePicker.align || align'
    :popper-class='timePicker.popperClass || popperClass'
    :default-value='timePicker.defaultValue || defaultValue'
    :prefix-icon='timePicker.prefixIcon || prefixIcon'
    :clear-icon='timePicker.clearIcon || clearIcon'
    :value-format='timePicker.valueFormat || valueFormat'
    :value='timePicker.value || value'
    :name='timePicker.name || name'
  >
  </el-time-picker>
</template>

<script>
    export default {
      name: 'GlTimePicker',
      props: {
        timePicker: {
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
        isRange: {
          type: Boolean,
          default: false
        },
        arrowControl: {
          type: Boolean,
          default: false
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
          type: Date
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
