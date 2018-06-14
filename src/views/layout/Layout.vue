<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <logo :height="logo.height" :width="logo.width" :backgroundColor="logo.backgroundColor"  :backgroundImage="logo.backgroundImage"></logo>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <tags-view></tags-view>
      <app-main :height="mainHeight"></app-main>
      <GLFooter></GLFooter>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, GLFooter } from './components'
import Logo from '@/components/Logo'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  data() {
    return {
      logo: {
        height: 50,
        width: 180,
        backgroundColor: '#192227',
        backgroundImage: '../../static/logo.png'
      }
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    GLFooter,
    Logo
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    mainHeight() {
      return this.$store.state.app.mainHeight
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
