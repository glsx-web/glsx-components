<template>
    <el-row
        :gutter='row.gutter || gutter'
        :type='row.type || type'
        :justify='row.justify || justify'
        :align='row.align || align'
        :tag='row.tag || tag'
    >
        <slot></slot>
    </el-row>
</template>

<script>
    export default {
      name: 'GlRow',
      props: {
        row: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        gutter: {
          type: Number,
          default: 0
        },
        type: {
          type: String
        },
        justify: {
          type: String,
          default: 'start'
        },
        align: {
          type: String,
          default: 'top'
        },
        tag: {
          type: String,
          default: 'div'
        }
      }
    }
</script>
