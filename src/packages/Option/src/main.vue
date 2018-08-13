<template>
    <el-option
        :value='option.value || value'
        :label='option.label || label'
        :disabled='option.disabled || disabled'
    >
      <slot></slot>
    </el-option>
</template>
<script>
export default {
  name: 'GlOption',
  props: {
    option: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    value: {
      type: [String, Number, Object]
    },
    label: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean
    }
  }
}
</script>
