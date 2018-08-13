<template>
     <el-tab-pane
      :label='tabPane.label || label'
      :disabled='tabPane.disabled || disabled'
      :name='tabPane.name || name'
      :closable='tabPane.closable || closable'
      :lazy='tabPane.lazy || lazy'
     >
         <slot></slot>
     </el-tab-pane>
</template>

<script>
export default {
  name: 'GlTabPane',
  props: {
    tabPane: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    },
    closable: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    }
  }
}
</script>
