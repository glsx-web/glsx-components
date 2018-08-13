<template>
    <el-autocomplete
        v-model="model_"
        :fetch-suggestions="autocomplete.fetchSuggestions || fetchSuggestions"
        :popper-class='autocomplete.popperClass || popperClass'
        :placeholder="autocomplete.placeholder || placeholder"
        :disabled='autocomplete.disabled || disabled'
        :trigger-on-focus="autocomplete.triggerOnFocus || triggerOnFocus"
        @select="select"
        :debounce='autocomplete.debounce || debounce'
        :value-key='autocomplete.valueKey || valueKey'
        :placement='autocomplete.placement || placement'
        :value='autocomplete.value || value'
        :name='autocomplete.name || name'
        :select-when-unmatched='autocomplete.selectWhenUnmatched || selectWhenUnmatched'
        :label='autocomplete.label || label'
        :prefix-icon='autocomplete.prefixIcon || prefixIcon'
        :suffix-icon='autocomplete.suffixIcon || suffixIcon'
        :hide-loading='autocomplete.hideLoading || hideLoading'
    >
        <slot name='prefix' slot="prefix"></slot>
        <slot name='suffix' slot="suffix"></slot>
        <slot name='prepend' slot="prepend"></slot>
        <slot name='append' slot="append"></slot>
    </el-autocomplete>
</template>
<script>
    export default {
      name: 'GlAutocomplete',
      props: {
        autocomplete: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        placeholder: {
          type: String
        },
        disabled: {
          type: Boolean,
          default: false
        },
        valueKey: {
          type: String
        },
        value: {
          type: null
        },
        debounce: {
          type: Number,
          default: 300
        },
        placement: {
          type: String,
          default: 'bottom-start'
        },
        fetchSuggestions: {
          type: Function,
          default: _ => null
        },
        popperClass: {
          type: String
        },
        triggerOnFocus: {
          type: Boolean,
          default: true
        },
        name: {
          type: String
        },
        selectWhenUnmatched: {
          type: Boolean,
          default: false
        },
        label: {
          type: String
        },
        prefixIcon: {
          type: String
        },
        suffixIcon: {
          type: String
        },
        hideLoading: {
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
          this.$emit('blur', val)
          this.$emit('focus', val)
        }
      },
      methods: {
        select(val) {
          this.$emit('select', val)
        }
      }
    }
</script>
