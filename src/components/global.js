// import Vue from 'vue'
// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }
// const requireComponent = require.context('.', false, /\.vue$/)// 找到components文件夹下以.vue命名的文件 './xxxx.vue'
// requireComponent.keys().forEach(fileName => {
//   const componentConfig = requireComponent(fileName)
//   // 去掉头和尾，保留文件名 fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
//   const componentName = capitalizeFirstLetter(fileName.split('/')[1])
//   Vue.component(componentName, componentConfig.default || componentConfig)
// })
