<template>
    <el-container
        :direction='direction'
        :class="{ 'is-vertical': isVertical }"
    >
        <slot></slot>
    </el-container>
</template>

<script>
export default {
  name: 'GlContainer',
  componentName: 'GlContainer',
  props: {
    direction: {
      type: String
    }
  },
  computed: {
    isVertical() {
      if (this.direction === 'vertical') {
        return true
      } else if (this.direction === 'horizontal') {
        return false
      }
      return this.$slots && this.$slots.default
        ? this.$slots.default.some(vnode => {
          const tag = vnode.componentOptions && vnode.componentOptions.tag
          return tag === 'gl-header' || tag === 'gl-footer'
        })
        : false
    }
  }
}
</script>