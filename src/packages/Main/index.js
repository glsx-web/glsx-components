import GlMain from './src/main'
GlMain.install = function(Vue) {
  Vue.component(GlMain.name, GlMain)
}
export default GlMain
