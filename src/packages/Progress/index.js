import GlProgress from './src/main'
GlProgress.install = function(Vue) {
  Vue.component(GlProgress.name, GlProgress)
}
export default GlProgress
