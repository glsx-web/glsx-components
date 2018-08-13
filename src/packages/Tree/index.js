import GlTree from './src/main'
GlTree.install = function(Vue) {
  Vue.component(GlTree.name, GlTree)
}
export default GlTree
