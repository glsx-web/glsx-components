<template>
    <el-breadcrumb
        :separator='breadcrumb.separator || separator'
        :separator-class='breadcrumb.separatorClass || separatorClass'
    >
        <slot></slot>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'GlBreadcrumb',
  props: {
    breadcrumb: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    separator: {
      type: String,
      default: '/'
    },
    separatorClass: {
      type: String
    }
  }
}
</script>
