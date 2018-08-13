<template>
    <el-dropdown-item
        :command='dropdownItem.command || command'
        :disabled='dropdownItem.disabled || disabled'
        :divided='dropdownItem.divided || divided'
    >
        <slot></slot>
    </el-dropdown-item>
</template>

<script>
export default {
  name: 'GlDropdownItem',
  props: {
    dropdownItem: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    command: {
      type: [String, Number, Object]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    divided: {
      type: Boolean,
      default: false
    }
  }
}
</script>