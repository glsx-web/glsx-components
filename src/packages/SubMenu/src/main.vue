<template>
    <el-submenu
        :index='submenu.index || index'
        :popper-class='submenu.popperClass || popperClass'
        :show-timeout='submenu.showTimeout || showTimeout'
        :hide-timeout='submenu.hideTimeout || hideTimeout'
        :disabled='submenu.disabled || disabled'
        :popper-append-to-body='submenu.popperAppendToBody || popperAppendToBody'
    >
        <slot></slot>
        <slot name="title" slot="title"></slot>
    </el-submenu>
</template>

<script>
export default {
  name: 'GlSubmenu',
  props: {
    submenu: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    index: {
      type: String
    },
    popperClass: {
      type: String
    },
    showTimeout: {
      type: Number,
      default: 300
    },
    hideTimeout: {
      type: Number,
      default: 300
    },
    disabled: {
      type: Boolean,
      default: false
    },
    popperAppendToBody: {
      type: Boolean
    }
  }
}
</script>
