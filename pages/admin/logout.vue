<template>
  <div>Очищаем данные</div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['adminAuth'],
  beforeCreate () {
    this.$store.dispatch('auth/LOGOUT')
    this.$router.push('/admin/login?messege=logout')
  }
}
</script>
