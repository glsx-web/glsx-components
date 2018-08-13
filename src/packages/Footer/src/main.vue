<template>
    <el-footer :height='height'>
        <slot></slot>
    </el-footer>
</template>

<script>
export default {
  name: 'GlFooter',
  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
