<template>
    <el-breadcrumb-item
        :to='breadcrumbItem.to || to'
        :replace='breadcrumbItem.replace || replace'
    >
        <slot></slot>
    </el-breadcrumb-item>
</template>

<script>
export default {
  name: 'GlBreadcrumbItem',
  props: {
    breadcrumbItem: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    to: {
      type: [String, Object]
    },
    replace: {
      type: Boolean,
      default: false
    }
  }
}
</script>
