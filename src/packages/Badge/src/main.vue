<template>
    <el-badge 
        :value='badge.value || value'
        :max='badge.max || max'
        :is-dot='badge.isDot || isDot'
        :hidden='badge.hidden || hidden'
    >
        <slot></slot>
    </el-badge>
</template>

<script>
    export default {
      name: 'GlBadge',
      props: {
        badge: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        value: {
          type: [String, Number]
        },
        max: {
          type: Number
        },
        isDot: {
          type: Boolean,
          default: false
        },
        hidden: {
          type: Boolean,
          default: false
        }
      }
    }
</script>
