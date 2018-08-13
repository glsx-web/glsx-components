<template>
  <el-input-number 
    v-model="model_"
    :value='inputNumber.value || value'
    :min="inputNumber.min || min" 
    :max="inputNumber.max || max" 
    :disabled="inputNumber.disabled || disabled"
    :step="inputNumber.step || step"
    :precision='inputNumber.precision || precision'
    :size='inputNumber.size || size'
    :controls-position='inputNumber.controlsPosition || controlsPosition'
    :controls='inputNumber.controls || controls'
    :name='inputNumber.name || name'
    :label='inputNumber.label || label'
    @change='change'
    @blur='blur'
    @focus='focus'
    >
    </el-input-number>
</template>

<script>
    export default {
      name: 'GlInputNumber',
      data() {
        return {
          model_: this.value
        }
      },
      props: {
        value: {
          type: null
        },
        inputNumber: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        min: {
          type: Number
        },
        max: {
          type: Number
        },
        step: {
          type: Number,
          default: 1
        },
        precision: {
          type: Number
        },
        size: {
          type: String
        },
        disabled: {
          type: Boolean,
          default: false
        },
        controls: {
          type: Boolean,
          default: true
        },
        controlsPosition: {
          type: String
        },
        name: {
          type: String
        },
        label: {
          type: String
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
        blur(val) {
          this.$emit('blur', val)
        },
        focus(val) {
          this.$emit('focus', val)
        },
        change(val) {
          this.$emit('change', val)
        }
      }
    }
</script>
