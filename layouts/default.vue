<template>
  <div class="container-app">
    <div class="app-aside" :class="{'app-aside-hide': asideHide}">
      <Aside />
    </div>
    <div class="app-content">
      <div class="app-content__header"><Navigation /></div>
      <div class="app-content__main"><Nuxt /></div>
      <div class="app-content__footer"><Footer /></div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/client/Navigation'
import Footer from '@/components/client/Footer'
import Aside from '@/components/client/Aside'
export default {
  components: {
    Navigation,
    Footer,
    Aside
  },
  data () {
    return {}
  },
  computed: {
    isError () {
      return this.$store.getters.isError
    },
    asideHide () {
      return this.$store.state.clientUX.asideState
    }
  },
  watch: {
    isError (val) {
      console.log(val)
    }
  },
  mounted () {},
  methods: {}
}
</script>
