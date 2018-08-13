<template>
    <el-slider 
        v-model="model_"
        :min='slider.min || min'
        :max='slider.max || max'
        :disabled='slider.disabled || disabled'
        :step='slider.step || step'
        :show-input='slider.showInput || showInput'
        :show-input-controls='slider.showInputControls || showInputControls'
        :input-size='slider.inputSize || inputSize'
        :show-stops='slider.showStops || showStops'
        :show-tooltip='slider.showTooltip || showTooltip'
        :format-tooltip='slider.formatTooltip || formatTooltip'
        :range='slider.range || range'
        :vertical='slider.vertical || vertical'
        :height='slider.height || height'
        :label='slider.label || label'
        :debounce='slider.debounce || debounce'
        :tooltip-class='slider.tooltipClass || tooltipClass'
    >
    </el-slider>
</template>

<script>
export default {
  name: 'GlSlider',
  props: {
    value: {
      type: null
    },
    slider: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    disabled: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    },
    showInput: {
      type: Boolean,
      default: false
    },
    showInputControls: {
      type: Boolean,
      default: true
    },
    inputSize: {
      type: String,
      default: 'small'
    },
    showStops: {
      type: Boolean,
      default: false
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    formatTooltip: {
      type: Function
    },
    range: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    height: {
      type: String
    },
    label: {
      type: String
    },
    debounce: {
      type: Number,
      default: 300
    },
    tooltipClass: {
      type: String
    },
    model: {
      type: null
    },
    change: {
      type: Function
    }
  },
  data() {
    return {
      model_: this.value,
      change_: this.slider.change === undefined ? this.change === undefined ? _ => null : this.change : this.slider.change
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
