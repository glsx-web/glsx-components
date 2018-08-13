<template>
    <el-button
        :size='button.size || size'
        :type='button.type || type'
        :plain='button.plain || plain'
        :round='button.round || round'
        :circle='button.circle || circle'
        :loading='button.loading || loading'
        :disabled='button.disabled || disabled'
        :icon='button.icon || icon'
        :autofocus='button.autofocus || autofocus'
        :native-type='button.nativeType || nativeType'
        @click="click"
    >
        <slot></slot>
    </el-button>
</template>

<script>
    export default {
      name: 'GlButton',
      props: {
        button: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        size: {
          type: String
        },
        type: {
          type: String
        },
        plain: {
          type: Boolean,
          default: false
        },
        round: {
          type: Boolean,
          default: false
        },
        circle: {
          type: Boolean,
          default: false
        },
        loading: {
          type: Boolean,
          default: false
        },
        disabled: {
          type: Boolean,
          default: false
        },
        icon: {
          type: String
        },
        autofocus: {
          type: Boolean,
          default: false
        },
        nativeType: {
          type: String
        }
      },
      methods: {
        click(event) {
          this.$emit('click', event)
        }
      }
    }
</script>
