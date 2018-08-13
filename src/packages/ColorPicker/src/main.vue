<template>
    <el-color-picker
     v-model="model_"
     :size='colorPicker.size || size'
     :show-alpha='colorPicker.showAlpha   || showAlpha'
     :disabled='colorPicker.disabled || disabled'    
     :color-format='colorPicker.colorFormat || colorFormat'
     :popper-class='colorPicker.popperClass || popperClass'
     :predefine='colorPicker.predefine || predefine'
     @active-change='activeChange'
    ></el-color-picker>
</template>

<script>
export default {
  name: 'GlColorPicker',
  props: {
    colorPicker: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    size: {
      type: String
    },
    showAlpha: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    colorFormat: {
      type: String
    },
    popperClass: {
      type: String
    },
    predefine: {
      type: Array,
      default: _ => []
    },
    value: {
      type: null
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
  },
  methods: {
    activeChange(val) {
      this.$emit('active-change', val)
    }
  }
}
</script>
