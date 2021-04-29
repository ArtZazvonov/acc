<template>
  <div>
    <h1 v-if="error.statusCode === 404">Страница не существует</h1>
    <h1 v-else>Произошла ошибка</h1>
    <nuxt-link to="/">На главную</nuxt-link>
  </div>
</template>
<script>
export default {
  layout: 'login',
  props: ['error']
}
</script>
<style lang="scss" scoped>

</style>
