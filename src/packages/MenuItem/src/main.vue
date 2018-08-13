<template>
    <el-menu-item
        :index='menuItem.index || index'
        :route='menuItem.route || route'
        :disabled='menuItem.disabled || disabled'
    >
        <slot></slot>
        <slot name="title" slot="title"></slot>
    </el-menu-item>
</template>

<script>
export default {
  name: 'GlMenuItem',
  props: {
    menuItem: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    index: {
      type: String
    },
    route: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
