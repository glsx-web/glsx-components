<template>
    <el-col
        :span='col.span || span'
        :offset='col.offset || offset'
        :push='col.push || push'
        :pull='col.pull || pull'
        :xs='col.xs || xs'
        :sm='col.sm || sm'
        :md='col.md || md'
        :lg='col.lg || lg'
        :xl='col.xl || xl'
        :tag='col.tag || tag'
    >
        <slot></slot>
    </el-col>
</template>

<script>
    export default {
      name: 'GlCol',
      props: {
        col: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        span: {
          type: Number,
          default: 24
        },
        offset: {
          type: Number
        },
        push: {
          type: Number
        },
        pull: {
          type: Number
        },
        xs: {
          type: [Number, Object]
        },
        sm: {
          type: [Number, Object]
        },
        md: {
          type: [Number, Object]
        },
        lg: {
          type: [Number, Object]
        },
        xl: {
          type: [Number, Object]
        },
        tag: {
          type: String,
          default: 'div'
        }
      }
    }
</script>
