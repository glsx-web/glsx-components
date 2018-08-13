<template>
  <div class="rate">
      <el-rate
      v-model="model_"
      :max='rate.max || max'
      :disabled='rate.disabled || disabled'
      :allow-half='rate.allowHalf || allowHalf'
      :low-threshold='rate.lowThreshold || lowThreshold'
      :high-threshold='rate.highThreshold || highThreshold'
      :colors='rate.colors || colors'
      :void-color='rate.voidColor || voidColor'
      :disabled-void-color='rate.disabledVidColor || disabledVidColor'
      :icon-classes='rate.iconClasses || iconClasses'
      :void-icon-class='rate.voidIconClass || voidIconClass'
      :disabled-void-icon-class='rate.disabledVoidIconClass || disabledVoidIconClass'
      :show-text='rate.showText || showText'
      :show-score='rate.showScore || showScore'
      :text-color='rate.textColor || textColor'
      :texts='rate.texts || texts'
      :score-template='rate.scoreTemplate || scoreTemplate'
      >
      </el-rate>
    </div>
</template>

<script>
    export default {
      name: 'GlRate',
      props: {
        value: {
          type: Number,
          default: 0
        },
        rate: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        change: {
          type: Function,
          default: _ => undefined
        },
        model: {
          type: Number
        },
        max: {
          type: Number,
          default: 5
        },
        disabled: {
          type: Boolean,
          default: false
        },
        allowHalf: {
          type: Boolean,
          default: false
        },
        lowThreshold: {
          type: Number,
          default: 2
        },
        highThreshold: {
          type: Number,
          default: 4
        },
        colors: {
          type: Array,
          default: _ => ['#F7BA2A', '#F7BA2A', '#F7BA2A']
        },
        voidColor: {
          type: String,
          default: '#C6D1DE'
        },
        disabledVidColor: {
          type: String,
          default: '#EFF2F7'
        },
        iconClasses: {
          type: Array,
          default: _ => ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on']
        },
        voidIconClass: {
          type: String,
          default: 'el-icon-star-off'
        },
        disabledVoidIconClass: {
          type: String,
          default: 'el-icon-star-on'
        },
        showText: {
          type: Boolean,
          default: false
        },
        showScore: {
          type: Boolean,
          default: false
        },
        textColor: {
          type: String,
          default: '#1F2D3D'
        },
        texts: {
          type: Array,
          default: _ => ['极差', '失望', '一般', '满意', '惊喜']
        },
        scoreTemplate: {
          type: String,
          default: '{value}'
        }
      },
      data() {
        return {
          model_: this.value
        }
      },
      watch: {
        model_(val) {
          this.$emit('input', val)
          this.$emit('change', val)
        },
        value(val) {
          this.model_ = val
        }
      }
    }
</script>
