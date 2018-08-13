<template>
    <el-form
        :model='form.model || model'
        :rules='form.rules || rules'
        :inline='form.inline || inline'
        :label-position='form.labelPosition || labelPosition'
        :label-width='form.labelWidth || labelWidth'
        :label-suffix='form.labelSuffix || labelSuffix'
        :show-message='form.showMessage || showMessage'
        :inline-message='form.inlineMessage || inlineMessage'
        :status-icon='form.statusIcon || statusIcon'
        :validate-on-rule-change='form.validateOnRuleChange || validateOnRuleChange'
        :size='form.size || size'
        :disabled='form.disabled || disabled'
    >
        <slot></slot>
    </el-form>
</template>

<script>
    export default {
      name: 'GlForm',
      props: {
        form: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        model: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        rules: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        inline: {
          type: Boolean,
          deafult: false
        },
        labelPosition: {
          type: String,
          default: 'right'
        },
        labelWidth: {
          type: String
        },
        labelSuffix: {
          type: String
        },
        showMessage: {
          type: Boolean,
          deafult: true
        },
        inlineMessage: {
          type: Boolean,
          deafult: false
        },
        statusIcon: {
          type: Boolean,
          deafult: false
        },
        validateOnRuleChange: {
          type: Boolean,
          deafult: true
        },
        size: {
          type: String
        },
        disabled: {
          type: Boolean,
          deafult: false
        }
      }
    }
</script>

