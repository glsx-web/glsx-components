<template>
  <el-checkbox-group    
    v-model="model_"  
    :min='checkboxGroup.min || min' 
    :max='checkboxGroup.max || max'
    :fill='checkboxGroup.fill || fill'
    :text-color='checkboxGroup.textColor || textColor'
    :size='checkboxGroup.size || size'
    :disabled='checkboxGroup.disabled || disabled'
    @change="change"

  >
    <slot></slot>
  </el-checkbox-group>
</template>

<script>
    export default {
      name: 'GlCheckboxGroup',
      data() {
        return {
          model_: this.value
        }
      },
      props: {
        value: {
          type: null
        },
        checkboxGroup: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        size: {
          type: String
        },
        disabled: {
          type: Boolean,
          default: false
        },
        min: {
          type: Number
        },
        max: {
          type: Number
        },
        textColor: {
          type: String,
          default: '#fff'
        },
        fill: {
          type: String,
          default: '#409EFF'
        }
      },
      watch: {
        model_(val) {
          this.$emit('change', val)
        },
        value(val) {
          this.model_ = val
        }
      },
      methods: {
        change(val) {
          this.$emit('input', val)
        }
      }
    }
</script>