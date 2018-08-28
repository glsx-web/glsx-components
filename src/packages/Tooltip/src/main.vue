<template>
  <div class="gl-tooltip" ref="trigger" @mousemove="check" @mouseout="leave">
    <span><slot></slot></span>
    <div class="tooltip"
      ref="box"
      :class="{
        'top-start': placement === 'top-start',
        'top': placement === 'top',
        'top-end': placement === 'top-end',
        'left-start': placement === 'left-start',
        'left': placement === 'left',
        'left-end': placement === 'left-end',
        'right-start': placement === 'right-start',
        'right': placement === 'right',
        'right-end': placement === 'right-end',
        'bottom-start': placement === 'bottom-start',
        'bottom': placement === 'bottom',
        'bottom-end': placement === 'bottom-end',
        'show': show,
        'light': effect === 'light'
      },className"
      :style="style"
    >
      <div class="arrow" v-if="visibleArrow"></div>
      <div class="tip-content">
        <div v-if="content">{{content}}</div>
        <slot v-else name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
var time = null
export default {
  name: 'GlTooltip',
  data() {
    return {
      show: false,
      style: {},
      test: false
    }
  },
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    effect: {
      type: String,
      default: 'dark'
    },
    content: {
      type: String
    },
    value: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: false
    },
    visibleArrow: {
      type: Boolean,
      default: true
    },
    popperClass: String,
    openDelay: {
      type: Number,
      default: 0
    },
    manual: {
      type: Boolean,
      default: false
    },
    hideAfter: {
      type: Number,
      default: 0
    }
  },
  methods: {
    check() {
      clearTimeout(time)
      time = setTimeout(() => {
        if (!this.disabled && !this.manual) {
          this.show = true
        }
      }, this.openDelay)
    },
    leave() {
      if (!this.manual) {
        this.show = false
      }
    }
  },
  mounted() {
    this.show = this.value === true
  },
  computed: {
    className() {
      return this.popperClass || ''
    }
  },
  watch: {
    value(val) {
      setTimeout(() => { this.show = val }, this.openDelay)
    },
    show(val) {
      this.$emit('input', val)
      if (val) {
        const childer = this.$refs.trigger
        const box = this.$refs.box
        switch (this.placement) {
          case 'top':
          case 'top-start':
          case 'top-end':
            this.style = {
              left: 0,
              top: `-${childer.offsetHeight + box.offsetHeight / 2}px`
            }
            break
          case 'right':
          case 'right-start':
          case 'right-end':
            this.style = {
              right: `-${(childer.offsetWidth + box.offsetWidth / 2) + 5}px`,
              top: 0
            }
            break
          case 'bottom':
          case 'bottom-start':
          case 'bottom-end':
            this.style = {
              left: 0,
              bottom: `-${(childer.offsetHeight + box.offsetHeight / 2)}px`
            }
            break
          case 'left':
          case 'left-start':
          case 'left-end':
            this.style = {
              left: `-${(childer.offsetWidth + box.offsetWidth / 2) + 5}px`,
              top: 0
            }
            break
        }
      }
    }
  }
}
</script>

<style scoped>
  .gl-tooltip{
    position: relative;
    display: inline-block;
  }
  .gl-tooltip .tooltip{
    width: auto;
    height: auto;
    position: absolute;
    z-index: -1;
    background: #303133;
    border-radius: 4px;
    color: #fff;
    padding: 10px;
    font-size: 12px;
    line-height: 1.3;
    min-width: 10px;
    opacity: 0;
    border: 1px solid #303133;
    transition: opacity 0.3s;
  }
  .gl-tooltip .show{
    opacity: 1;
    z-index: 2000;
  }
  .gl-tooltip .arrow{
    position: absolute;
    width: 0;
    height: 0;
    border-width: 6px;
    border-style: solid;
    border-color: transparent;
  }
  /* 上 */
  .gl-tooltip .top .arrow{
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: #303133;
  }
  .gl-tooltip .top-start .arrow{
    bottom: -12px;
    border-top-color: #303133;
  }
  .gl-tooltip .top-end .arrow{
    bottom: -12px;
    right: 15%;
    border-top-color: #303133;
  }
  /* 右 */
  .gl-tooltip .right .arrow{
    top: 50%;
    left: -12px;
    transform: translateY(-50%);
    border-right-color: #303133;
  }
  .gl-tooltip .right-start .arrow{
    left: -12px;
    top: 15%;
    border-right-color: #303133;
  }
  .gl-tooltip .right-end .arrow{
    bottom: 15%;
    left: -12px;
    border-right-color: #303133;
  }
  /* 下 */
  .gl-tooltip .bottom .arrow{
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: #303133;

  }
  .gl-tooltip .bottom-start .arrow{
    top: -12px;
    border-bottom-color: #303133;
  }
  .gl-tooltip .bottom-end .arrow{
    top: -12px;
    right: 15%;
    border-bottom-color: #303133;
  }
  /* 左 */
  .gl-tooltip .left .arrow{
    top: 50%;
    right: -12px;
    transform: translateY(-50%);
    border-left-color: #303133;

  }
  .gl-tooltip .left-start .arrow{
    top: 15%;
    right: -12px;
    border-left-color: #303133;

  }
  .gl-tooltip .left-end .arrow{
    bottom: 15%;
    right: -12px;
    border-left-color: #303133;

  }
  .gl-tooltip .light{
    background: #fff;
    color: #303133;
  }
  .gl-tooltip .light .arrow::after{
    content: '';
    position: absolute;
    
    border-width: 4.5px;
    border-style: solid;
    border-color: transparent;
  }
  /* 上白箭头 */
  .gl-tooltip .light.top-start .arrow::after,
  .gl-tooltip .light.top .arrow::after,
  .gl-tooltip .light.top-end .arrow::after
  {
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: #fff;
  }
  /* 白右箭头 */
  .gl-tooltip .light.right-start .arrow::after,
  .gl-tooltip .light.right .arrow::after,
  .gl-tooltip .light.right-end .arrow::after
  {
    top: 50%;
    left: -3px;
    transform: translateY(-50%);
    border-right-color: #fff;
  }
  /* 白下箭头 */
  .gl-tooltip .light.bottom-start .arrow::after,
  .gl-tooltip .light.bottom .arrow::after,
  .gl-tooltip .light.bottom-end .arrow::after
  {
    top: -3px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: #FFF;
  }
  /* 白左箭头 */
  .gl-tooltip .light.left-start .arrow::after,
  .gl-tooltip .light.left .arrow::after,
  .gl-tooltip .light.left-end .arrow::after
  {
    top: 50%;
    right: -3px;
    transform: translateY(-50%);
    border-left-color: #fff;
  }
  
</style>