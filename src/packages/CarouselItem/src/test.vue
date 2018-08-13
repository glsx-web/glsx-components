<template>
    <el-carousel-item
        :name='carouselItem.name || name'
        :label='carouselItem.label || label'
    >
      <slot></slot>
    </el-carousel-item>
</template>

<script>
export default {
  name: 'GlCarouselItem',
  props: {
    carouselItem: {
      type: Object,
      default: _ => { return {} }
    },
    name: {
      type: String
    },
    label: {
      type: String
    }
  }
}
</script>
