<template>
    <el-tag
        :type='tag.type || type'
        :closable='tag.closable || closable'
        :disable-transitions='tag.disableTransitions || disableTransitions'
        :hit='tag.hit || hit'
        :color='tag.color || color'
        :size='tag.size || size'
        @close.stop="handleClose"
    >
        <slot></slot>
    </el-tag>
</template>

<script>
    export default {
      name: 'GlTag',
      data() {
        return {
        }
      },
      props: {
        tag: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        type: {
          type: String
        },
        closable: {
          type: Boolean
        },
        disableTransitions: {
          type: Boolean
        },
        hit: {
          type: Boolean
        },
        color: {
          type: String
        },
        size: {
          type: String
        }
      },
      methods: {
        handleClose(event) {
          this.$emit('close', event)
        }
      }
    }
</script>
