<template>
    <el-carousel
        :height='carousel.height || height'
        :initial-index='carousel.initialIndex || initialIndex'
        :trigger='carousel.trigger || trigger'
        :autoplay='carousel.autoplay || autoplay'
        :interval='carousel.interval || interval'
        :indicator-position='carousel.indicatorPosition || indicatorPosition'
        :arrow='carousel.arrow || arrow'
        :type='carousel.type || type'
        @change='change_'
    >
      <slot></slot>
    </el-carousel>
</template>

<script>
    export default {
      name: 'GlCarousel',
      props: {
        carousel: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        height: {
          type: String
        },
        initialIndex: {
          type: Number,
          default: 0
        },
        trigger: {
          type: String
        },
        autoplay: {
          type: Boolean,
          default: true
        },
        interval: {
          type: Number,
          default: 3000
        },
        indicatorPosition: {
          type: String
        },
        arrow: {
          type: String,
          default: 'hover'
        },
        type: {
          type: String
        },
        change: {
          type: Function,
          default: _ => undefined
        }
      },
      data() {
        return {
          change_: this.carousel.change === undefined ? this.change === undefined ? _ => null : this.change : this.carousel.change === undefined
        }
      }
    }
</script>