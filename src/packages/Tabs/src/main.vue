<template>
    <el-tabs
        v-model="model_"
        :type='tabs.type || type'
        :closable='tabs.closable || closable'
        :addabl='tabs.addable || addable'
        :editable='tabs.editable || editable'
        :value='tabs.value || value'
        :tab-position='tabs.tabPosition || tabPosition'
        :stretch='tabs.stretch || stretch'
        :before-leave='tabs.beforeLeave || beforeLeave'
        @tab-click='tabClick'
        @tab-remove='tabRemove'
        @tab-add='tabAdd'
        @edit='edit'
    >
        <slot></slot>
    </el-tabs>
</template>

<script>
export default {
  name: 'GlTabs',
  props: {
    tabs: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    type: {
      type: String
    },
    closable: {
      type: Boolean,
      default: false
    },
    addable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    value: {
      type: null
    },
    tabPosition: {
      type: String,
      default: 'top'
    },
    stretch: {
      type: Boolean,
      default: false
    },
    beforeLeave: {
      type: Function
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
      this.$emit('blur', val)
      this.$emit('focus', val)
    },
    value(val) {
      this.model_ = val
    }
  },
  methods: {
    tabClick(a, b) {
      this.$emit('tab-click', a, b)
    },
    tabRemove(a, b) {
      this.$emit('tab-remove', a, b)
    },
    tabAdd(a, b) {
      this.$emit('tab-add', a, b)
    },
    edit(a, b) {
      this.$emit('edit', a, b)
    }
  }
}
</script>
