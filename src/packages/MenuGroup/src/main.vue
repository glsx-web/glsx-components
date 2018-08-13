<template>
    <el-menu-item-group
        :title='title'
    >
        <slot></slot>
        <slot name='title' slot="title"></slot>
    </el-menu-item-group>
</template>

<script>
export default {
  name: 'GlMenuItemGroup',
  props: {
    title: {
      type: String
    }
  }
}
</script>
