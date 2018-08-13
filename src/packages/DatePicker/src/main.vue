<template>
    <el-date-picker
      v-model="model_"
      :align="datePicker.align || align"
      :type="datePicker.type || type"
      :placeholder="datePicker.placeholder || placeholder"
      :picker-options="datePicker.pickerOptions || pickerOptions"
      :unlink-panels='datePicker.unlinkPanels || unlinkPanels'
      :range-separator="datePicker.rangeSeparator || rangeSeparator"
      :start-placeholder="datePicker.startPlaceholder || startPlaceholder"
      :end-placeholder="datePicker.endPlaceholder || endPlaceholder"
      :readonly='datePicker.readonly || readonly'
      :disabled='datePicker.disabled || disabled'
      :editable='datePicker.editable || editable'
      :clearable='datePicker.clearable || clearable'
      :size='datePicker.size || size'
      :format='datePicker.format || format'
      :popper-class='datePicker.popperClass || popperClass'
      :default-value='datePicker.defaultValue || defaultValue'
      :default-time='datePicker.defaultTime || defaultTime'
      :value-format='datePicker.valueFormat || valueFormat'
      :prefix-icon='datePicker.prefixIcon || prefixIcon'
      :clear-icon='datePicker.clearIcon || clearIcon'
      :name='datePicker.name || name'
      >
    </el-date-picker>
</template>

<script>
    export default {
      name: 'GlDatePicker',
      props: {
        value: {
          type: null
        },
        datePicker: {
          type: Object,
          default: _ => {
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
        type: {
          type: String,
          default: 'yyyy-MM-dd'
        },
        format: {
          type: String
        },
        align: {
          type: String
        },
        popperClass: {
          type: String
        },
        pickerOptions: {
          type: Object
        },
        rangeSeparator: {
          type: String
        },
        defaultValue: {
          type: Date
        },
        defaultTime: {
          type: null
        },
        valueFormat: {
          type: String
        },
        name: {
          type: String
        },
        unlinkPanels: {
          type: Boolean,
          default: false
        },
        prefixIcon: {
          type: String,
          default: 'el-icon-date'
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
