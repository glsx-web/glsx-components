import GlTooltip from './src/main'
GlTooltip.install = function(Vue) {
  Vue.component(GlTooltip.name, GlTooltip)
}
export default GlTooltip
