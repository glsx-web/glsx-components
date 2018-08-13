<template>
    <el-alert
        :title="alert.title || title"
        :type="alert.type || type"
        :description='alert.description || description'
        :closable='alert.closable || closable'
        :center='alert.center || center'
        :close-text='alert.closeText || closeText' 
        :show-icon='alert.showIcon || showIcon'
        @close='close'
    >
      <slot></slot>
    </el-alert>
</template>

<script>
    export default {
      name: 'GlAlert',
      props: {
        alert: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        title: {
          type: String,
          default: '标题'
        },
        type: {
          type: String,
          default: 'info'
        },
        description: {
          type: String
        },
        closable: {
          type: Boolean,
          default: true
        },
        center: {
          type: Boolean
        },
        closeText: {
          type: String
        },
        showIcon: {
          type: Boolean,
          default: false
        }
      },
      data() {
        return {
        }
      },
      methods: {
        close() {
          this.$emit('close')
        }
      }
    }
</script>
