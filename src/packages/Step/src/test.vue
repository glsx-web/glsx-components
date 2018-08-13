<template>
  <el-step
    :title='step.title || title'
    :description='step.description || description'
    :icon='step.icon || icon'
    :status='step.status || status'
  >
    <slot name="icon" slot="icon"></slot>
    <slot name="title" slot="title"></slot>
    <slot name="description" slot="description"></slot>
  </el-step>
</template>

<script>
export default {
  name: 'GlStep',
  props: {
    step: {
      type: Object,
      default: _ => { return {} }
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    icon: {
      type: String
    },
    status: {
      type: String
    }
  }
}
</script>
