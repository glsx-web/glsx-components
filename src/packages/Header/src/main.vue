<template>
    <el-header
        :height='height'
    >
        <slot></slot>
    </el-header>
</template>
<script>
export default {
  name: 'GlHeader',
  props: {
    height: {
      type: String,
      default: '60px'
    }
  }
}
</script>
