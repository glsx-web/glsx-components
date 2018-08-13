<template>
    <el-option-group
        :label='optionGroup.label || label'
        :disabled='optionGroup.disabled || disabled'
    >
        <slot></slot>
    </el-option-group>
</template>
<script>
export default {
  name: 'GlOptionGroup',
  props: {
    optionGroup: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
