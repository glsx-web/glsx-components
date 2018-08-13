<template>
  <el-radio-group 
    v-model="model_" 
    :size='radioGroup.size || size'
    :fill="radioGroup.fill || fill"
    :text-color="radioGroup.tetxColor || tetxColor"
    :disabled='radioGroup.disabled || disabled'
    
    >
    <slot></slot>
  </el-radio-group>
</template>

<script>
    export default {
      name: 'GlRadioGroup',
      props: {
        value: {
          type: null
        },
        radioGroup: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        size: {
          type: String
        },
        fill: {
          type: String,
          default: '#409EFF'
        },
        tetxColor: {
          type: String,
          default: '#fff'
        },
        disabled: {
          type: Boolean,
          default: false
        },
        change: {
          type: Function
        }
      },
      created() {
        this.$on('handleChange', value => {
          this.$emit('change', value)
        })
  },
      data() {
        return {
          model_: this.value,
          change_: this.radioGroup.change === undefined ? this.change === undefined ? _ => null : this.change : this.radioGroup.change
        }
      },
      watch: {
        model_(val) {
          this.$emit('input', val)
          this.$emit('change', val)
        },
        value(val) {
          // this.dispatch('GlFormItem', 'el.form.change', [this.value])
          this.model_ = val
        }
      }
    }
</script>