import GlUpload from './src/main'
GlUpload.install = function(Vue) {
  Vue.component(GlUpload.name, GlUpload)
}
export default GlUpload
