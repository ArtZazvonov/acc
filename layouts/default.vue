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
  methods: {}
}
</script>

<style lang="scss" scoped>
  .container-app{
    position: relative;
    display: flex;
    height: 100%;
  }
  .app-aside{
    flex-basis: 30%;
    flex-grow: 0;
    max-width: 350px;
    border-right: 1px solid black;
    transition: 0.4s;
  }
  .app-aside-hide{
    max-width: 50px;
  }
  .app-content{
    flex-basis: 70%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    &__header{
      padding: 15px 30px;
      border-bottom: 1px solid black;
    }
    &__main{
      overflow-x: hidden;
      overflow-y: auto;
      padding: 15px 30px;
      flex-grow: 1;
    }
    &__footer{
      padding: 15px 30px;
      border-top: 1px solid black;
    }
  }
</style>
