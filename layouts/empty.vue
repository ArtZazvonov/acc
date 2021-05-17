<template>
  <div class="empty-layout">
    <Nuxt />
  </div>
</template>

<script>
export default {
  computed: {
    isError () {
      return this.$store.getters.isError
    }
  },
  watch: {
    isError (val) {
      this.$message.error(val.response.data.messege)
    }
  }
}
</script>

<style lang="scss" scoped>
  .empty-layout{
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 200px;
  }
</style>
