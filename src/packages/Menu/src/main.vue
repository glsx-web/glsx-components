<template>
    <el-menu
        :mode='menu.mode || mode'
        :collapse='menu.collapse || collapse'
        :background-color='menu.backgroundColor || backgroundColor'
        :text-color='menu.textColor || textColor'
        :active-text-color='menu.activeTextColor || activeTextColor'
        :default-active='menu.defaultActive || defaultActive'
        :default-openeds='menu.defaultOpeneds || defaultOpeneds'
        :unique-opened='menu.uniqueOpened || uniqueOpened'
        :menu-trigger='menu.menuTrigger || menuTrigger'
        :router='menu.router || router'
        :collapse-transition='menu.collapseTransition || collapseTransition'
        @select='select'
        @open='open'
        @close='close'
    >
        <slot></slot>
    </el-menu>
</template>

<script>
export default {
  name: 'GlMenu',
  props: {
    menu: {
      type: Object,
      default: _ => {
        return {}
      }
    },
    mode: {
      type: String,
      default: 'vertical',
      validator: val => val === 'vertical' || val === 'horizontal'
    },
    collapse: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    textColor: {
      type: String,
      default: '#303133'
    },
    activeTextColor: {
      type: String,
      default: '#409EFF'
    },
    defaultActive: {
      type: String
    },
    defaultOpeneds: {
      type: Array
    },
    uniqueOpened: {
      type: Boolean,
      default: false
    },
    menuTrigger: {
      type: String,
      default: 'hover'
    },
    router: {
      type: Boolean,
      default: false
    },
    collapseTransition: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    select(a, b) {
      this.$emit('select', a, b)
    },
    open(a, b) {
      this.$emit('open', a, b)
    },
    close(a, b) {
      this.$emit('close', a, b)
    }
  }
}
</script>
