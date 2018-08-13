<template>
    <el-collapse-item
        :title='collapseItem.title || title'
        :name='collapseItem.name || name'
    >
        <slot></slot>
        <slot name="title" slot="title"></slot>
    </el-collapse-item>
</template>

<script>
    export default {
      name: 'GlCollapseItem',
      props: {
        collapseItem: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        name: {
          type: [Number, String]
        },
        title: {
          type: String
        }
      }
    }
</script>
