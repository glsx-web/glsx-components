<template>
    <el-steps
        :space='Steps.space || space'
        :direction='Steps.direction || direction'
        :active='Steps.active || active'
        :process-status='Steps.processStatus || processStatus'
        :finish-status='Steps.finishStatus || finishStatus'
        :align-center='Steps.alignCenter || alignCenter'
        :simple='Steps.simple || simple'
    >
        <slot></slot>
    </el-steps>
</template>

<script>
export default {
  name: 'GlSteps',
  props: {
    Steps: {
      type: Object,
      default: _ => { return {} }
    },
    space: {
      type: [Number, String]
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    active: {
      type: Number,
      default: 0
    },
    processStatus: {
      type: String,
      default: 'process'
    },
    finishStatus: {
      type: String,
      default: 'finish'
    },
    alignCenter: {
      type: Boolean,
      default: false
    },
    simple: {
      type: Boolean,
      default: false
    }
  }
}
</script>
