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
import Navigation from '@/components/client/Navigation'
import Footer from '@/components/client/Footer'
export default {
  components: {
    Navigation,
    Footer
  }
}
</script>
