<template>
  <el-radio-button
      v-model="model_"
      :label="radioButton.label || label"
      :disabled="radioButton.disabled || disabled"
      :name='radioButton.name || name'
      @change="handleChange"
  >
    <slot></slot>
  </el-radio-button>
</template>

<script>
    export default {
      name: 'GlRadioButton',
      props: {
        radioButton: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        label: {
          type: [String, Number, Boolean]
        },
        disabled: {
          type: Boolean,
          default: false
        },
        name: {
          type: String
        },
        change: {
          type: Function
        }
      },
      data() {
        return {
          model_: this.value,
          change_: this.radioButton.change === undefined ? this.change === undefined ? _ => null : this.change : this.radioButton.change
        }
      },
      computed: {
        value: {
          get() {
            return this._radioGroup.value
          },
          set(value) {
            this._radioGroup.$emit('input', value)
          }
        },
        _radioGroup() {
          let parent = this.$parent
          while (parent) {
            if (parent.$options.componentName !== 'GlRadioGroup') {
              parent = parent.$parent
            } else {
              return parent
            }
          }
          return false
        }
      },
      watch: {
        model_(val) {
          this.$emit('input', val)
        },
        value(val) {
          this.model_ = val
        }
      },
      methods: {
        handleChange() {
          this.$nextTick(() => {
            this.dispatch('GlRadioGroup', 'handleChange', this.value)
          })
        }
      }
    }
</script>