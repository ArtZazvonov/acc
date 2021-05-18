<template>
  <h1>admin</h1>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['adminAuth'],
  computed: {
    isUser () {
      return this.$store.getters['auth/user']
    }
  },
  mounted () {
    console.log(this.isUser)
  }
}
</script>
