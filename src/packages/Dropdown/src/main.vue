<template>
    <el-dropdown
        :type='dropdown.type || type'
        :size='dropdown.size || size'
        :split-button='dropdown.splitButton || splitButton'
        :placement='dropdown.placement || placement'
        :trigger='dropdown.trigger || trigger'
        :hide-on-click='dropdown.hideOnClick || hideOnClick'
        :show-timeout='dropdown.showTimeout || showTimeout'
        :hide-timeout='dropdown.hideTimeout || hideTimeout'
        @click='click'
        @command='command'
        @visible-change='visibleChange'
    >
        <slot></slot>
        <slot name="dropdown" slot="dropdown"></slot>
    </el-dropdown>
</template>

<script>
export default {
  name: 'GlDropdown',
  props: {
    dropdown: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    type: {
      type: String
    },
    size: {
      type: String
    },
    splitButton: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom-end'
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    hideOnClick: {
      type: Boolean,
      default: true
    },
    showTimeout: {
      type: Number,
      default: 250
    },
    hideTimeout: {
      type: Number,
      default: 150
    }
  },
  methods: {
    click(val) {
      this.$emit('click', val)
    },
    command(val) {
      this.$emit('command', val)
    },
    visibleChange(val) {
      this.$emit('visible-change', val)
    }
  }
}
</script>