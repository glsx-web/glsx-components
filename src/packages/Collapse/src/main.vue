<template>
    <el-collapse
        v-model="model_"
        :accordion='collapse.accordion || accordion'
        :value='collapse.value || value'
    >
        <slot></slot>
    </el-collapse>
</template>

<script>
    export default {
      name: 'GlCollapse',
      props: {
        collapse: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        accordion: {
          type: Boolean,
          default: false
        },
        value: {
          type: [String, Array]
        },
        change: {
          type: Function,
          default: _ => undefined
        }
      },
      data() {
        return {
          model_: this.value,
          change_: this.collapse.change === undefined ? this.change === undefined ? _ => null : this.change : this.collapse.change
        }
      },
      watch: {
        model_(val) {
          this.$emit('input', val)
          this.$emit('change', val)
          this.$emit('blur', val)
          this.$emit('focus', val)
        },
        value(val) {
          this.model_ = val
        }
      }
    }
</script>
