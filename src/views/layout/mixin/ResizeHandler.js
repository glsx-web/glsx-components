import store from '@/store'

const { body } = document
const WIDTH = 1024
const RATIO = 3
const EXCLUDE = 124

export default {
  watch: {
    $route(route) {
      this.device === 'mobile' && this.sidebar.opened && store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  },
  beforeMount() {
    window.addEventListener('resize', this._.debounce(() => { this.resizeHandler() }, 400))
  },
  mounted() {
    // this.setMainHeight()
    // const isMiniSize = this.isMiniSize()
    // isMiniSize && store.dispatch('ToggleDevice', 'mobile') && store.dispatch('CloseSideBar', { withoutAnimation: true })
    // this.toggleDevice()
    this.resize()
  },
  methods: {
    isMiniSize() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    setMainHeight() {
      store.dispatch('SetMainHeight', document.body.clientHeight - EXCLUDE)
    },
    toggleDevice() {
      const isMiniSize = this.isMiniSize()
      store.dispatch('ToggleDevice', isMiniSize ? 'mobile' : 'desktop')
      isMiniSize && store.dispatch('CloseSideBar', { withoutAnimation: true })
    },
    resize() {
      this.setMainHeight()
      this.toggleDevice()
    },
    resizeHandler() {
      !document.hidden && this.resize()
    }
  }
}
