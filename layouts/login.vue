<template>
  <div class="container-app">
    <div class="app-content">
      <div class="app-content__header"><Navigation /></div>
      <div class="app-content__main"><Nuxt /></div>
      <div class="app-content__footer"><Footer /></div>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
export default {
  components: {
    Navigation,
    Footer
  },
  computed: {
    isError () {
      return this.$store.getters.isError
    }
  },
  watch: {
    isError (val) {
      alert(val.response.data.messege)
    }
  }
}
</script>
