<template>
    <el-form-item 
        :label="formItem.label || label"
        :prop='formItem.prop || prop'
        :label-width='formItem.labelWidth || labelWidth'
        :required='formItem.required || required'
        :rules='formItem.rules || rules'
        :error='formItem.error || error'
        :show-message='formItem.showMessage || showMessage'
        :inline-message='formItem.inlineMessage || inlineMessage'
        :size='formItem.size || size'
    >
        <slot></slot>
    </el-form-item>
</template>

<script>
    export default {
      name: 'GlFormItem',
      props: {
        formItem: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        label: {
          type: String
        },
        prop: {
          type: null
        },
        labelWidth: {
          type: String
        },
        required: {
          type: Boolean,
          default: false
        },
        rules: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        error: {
          type: String
        },
        showMessage: {
          type: Boolean,
          default: true
        },
        inlineMessage: {
          type: Boolean,
          default: false
        },
        size: {
          type: String
        }
      }
    }
</script>

