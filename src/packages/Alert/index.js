import GlAlert from './src/main'
GlAlert.install = function(Vue) {
  Vue.component(GlAlert.name, GlAlert)
}
export default GlAlert
