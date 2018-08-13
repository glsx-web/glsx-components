<template>
    <el-card
        :body-style='card.bodyStyle || bodyStyle'
        :shadow='card.shadow || shadow'
    >
        <slot name='header' slot="header"></slot>
        <slot></slot>
    </el-card>
</template>

<script>
    export default {
      name: 'GlCard',
      props: {
        card: {
          type: Object,
          default: _ => {
            return {}
          }
        },
        bodyStyle: {
          type: Object,
          default: _ => {
            return {
              padding: '20px'
            }
          }
        },
        shadow: {
          type: String,
          default: 'always'
        }
      }
    }
</script>
