<template>
    <section class="app-main">
      <transition name="fade" mode="out-in">
          <EasyScrollbar>
            <div id="warapper" :style="{ 'height': height + 'px'}">
                <!-- <router-view :key="key"></router-view> -->
              <router-view></router-view>
            </div>
        </EasyScrollbar>
      </transition>
    </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  props: {
    height: {
      type: Number,
      default: 0
    }
  }
}
</script>

