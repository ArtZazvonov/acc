<template>
  <el-row>
    <el-col>
      <h3>Список пользователей</h3>
      <div>{{ users }}</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['adminAuth'],
  async asyncData ({ store }) {
    const users = await store.dispatch('adminUser/USER_LIST')
    return { users }
  }
}
</script>

<style lang="scss" scoped>

</style>
