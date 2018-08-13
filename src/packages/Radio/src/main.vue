<template>
  <el-radio
      v-model="model"
      :label="radio.label || label"
      :disabled="radio.disabled || disabled"
      :border="radio.border || border"
      :size='radio.size || size'
      :name='radio.name || name'
      @change="handleChange"
  >
    <slot></slot>
  </el-radio>
</template>

<script>
    export default {
      name: 'GlRadio',
      props: {
        value: {
          type: null
        },
        radio: {
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
        border: {
          type: Boolean,
          default: false
        },
        size: {
          type: String
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
          change_: this.radio.change === undefined ? this.change === undefined ? _ => null : this.change : this.radio.change
        }
      },
      computed: {
        model: {
          get() {
            return this.isGroup ? this._radioGroup.value : this.value
          },
          set(val) {
            this.$emit('input', val)
          }
        }
      },
      watch: {
        value(val) {
          this.model_ = val
        }
      },
      methods: {
        handleChange() {
          this.$nextTick(() => {
            this.$emit('change', this.model_)
            this.isGroup && this.dispatch('GlRadioGroup', 'handleChange', this.model_)
          })
        }
      }
    }
</script>