<template>
  <el-row>
    <el-col>
      <h3>Список пользователей</h3>
      <el-table :data="users" :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%" border>
        <el-table-column prop="login" sortable label="Логин" width="100" />
        <el-table-column prop="firstName" sortable label="Имя" />
        <el-table-column prop="lastName" label="Фамилия" />
        <el-table-column prop="role" label="Роль" />
        <el-table-column fixed="right" label="Действие">
          <template slot-scope="{ row }">
            <el-tooltip effect="dark" content="Редактировать профиль" placement="top">
              <el-button type="primary" icon="el-icon-edit" circle @click.native.prevent="userEdit(row._id)" />
            </el-tooltip>
            <el-tooltip effect="dark" content="Удалить профиль" placement="top">
              <el-button type="danger" icon="el-icon-delete" circle @click.native.prevent="userDelete(row._id)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['adminAuth'],
  async asyncData ({ store }) {
    const users = await store.dispatch('user/USER_LIST')
    return { users }
  },
  methods: {
    userEdit (id) {
      this.$router.push({ path: `/admin/user/${id}` })
    },
    async userDelete (id) {
      try {
        await this.$confirm('Удалить пользователя?', 'Внимание!', {
          confirmButtonText: 'Да',
          cancelButtonText: 'Отмена',
          type: 'warning'
        })
        await this.$store.dispatch('user/REMOVE_USER', id)
        this.users = this.users.filter(t => t._id !== id)
        this.$message.success('Пользователь удален')
      } catch (error) {
        this.$message.info('Пользователь не удален')
      }
    }
  }
}
</script>

<style lang="scss"></style>
