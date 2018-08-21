<template>
  <el-input 
      v-model="model_" 
      :type='input.type || type'
      :placeholder="input.placeholder || placeholder"
      :disabled="input.disabled || disabled"
      :clearable='input.clearable || clearable'
      :min-length='input.minLength || minLength'
      :max-length='input.maxLength || maxLength'
      :prefix-icon='input.prefixIcon || prefixIcon'
      :suffix-icon='input.suffixIcon || suffixIcon'
      :size='input.size || size'
      :value='input.value || value'
      :readonly='input.readonly || readonly'
      :rows='input.rows || rows'
      :autosize='input.autosize || autosize'
      @blur="blur"
      @focus="focus"
      @change="change"
      @clear='clear'
      @keyup.enter.native="input_"
      ref='input'
  >
    <slot name='prefix' slot="prefix"></slot>
    <slot name='suffix' slot="suffix"></slot>
    <slot name='prepend' slot="prepend"></slot>
    <slot name='append' slot="append"></slot>
  </el-input>
</template>

<script>
    export default {
      name: 'GlInput',
      props: {
        value: {
          type: null
        },
        input: {
          type: Object,
          default: _ => {
            return {
              minLength: 1,
              maxLength: 100
            }
          }
        },
        type: {
          type: String
        },
        maxlength: {
          type: Number
        },
        minlength: {
          type: Number
        },
        placeholder: {
          type: String
        },
        clearable: {
          type: Boolean,
          default: false
        },
        disabled: {
          type: Boolean,
          default: false
        },
        size: {
          type: String
        },
        prefixIcon: {
          type: String
        },
        suffixIcon: {
          type: String
        },
        rows: {
          type: Number
        },
        autosize: {
          type: [Boolean, Object]
        },
        readonly: {
          type: Boolean,
          default: false
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
          this.$emit('input', val)
        },
        clear() {
          this.$emit('clear', '')
        },
        input_(val) {
          this.blur()
        }
      }
    }
</script>
