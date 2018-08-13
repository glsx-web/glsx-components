import GlContainer from './src/main'
GlContainer.install = function(Vue) {
  Vue.component(GlContainer.name, GlContainer)
}
export default GlContainer
