import GlTooltip from './src/test'
GlTooltip.install = function(Vue) {
  Vue.component(GlTooltip.name, GlTooltip)
}
export default GlTooltip
