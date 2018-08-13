<template>
    <el-progress 
        :percentage="progress.percentage || percentage"
        :type='progress.type || type'
        :stroke-width='progress.strokeWidth || strokeWidth'
        :text-inside='progress.textInside || textInside'
        :status='progress.status || status'
        :color='progress.color || color'
        :width='progress.width || width'
        :show-text='progress.showText || showText'
    >
    </el-progress>
</template>

<script>
    export default {
      name: 'GlProgress',
      props: {
        progress: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        percentage: {
          type: Number,
          default: 0
        },
        type: {
          type: String,
          default: 'line'
        },
        strokeWidth: {
          type: Number,
          default: 6
        },
        textInside: {
          type: Boolean,
          default: false
        },
        status: {
          type: String
        },
        color: {
          type: String
        },
        width: {
          type: Number,
          default: 126
        },
        showText: {
          type: Boolean,
          default: true
        }
      }
    }
</script>
