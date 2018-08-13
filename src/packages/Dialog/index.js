import GlDialog from './src/main'
GlDialog.install = function(Vue) {
  Vue.component(GlDialog.name, GlDialog)
}
export default GlDialog
