<template>
  <el-card>
    <h3 slot="header">Рекатрирование профиля</h3>
    <el-form ref="form" :model="localUser" status-icon label-width="120px" label-position="top">
      <el-avatar v-if="localUser.image" :src="'/upload' + localUser.image" />
      <el-avatar v-else icon="el-icon-user-solid" />
      <el-form-item label="Имя">
        <el-input v-model="localUser.firstName" />
      </el-form-item>
      <el-form-item label="Фамилия">
        <el-input v-model="localUser.lastName" />
      </el-form-item>
      <el-form-item label="Роль">
        <el-select v-model="localUser.role" placeholder="Роль пользователя">
          <el-option label="Администратор" value="0">Администратор</el-option>
          <el-option label="Оператор" value="1">Оператор</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click.prevent="onSubmit()">Сохранить</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['adminAuth'],
  validate ({ params }) {
    return Boolean(params.id)
  },
  async asyncData ({ store, params }) {
    const user = await store.dispatch('user/USER_ID', params.id)
    return { user }
  },
  data () {
    return {
      loading: false,
      localUser: {}
    }
  },
  head () {
    return {
      title: `Пользователь | ${this.localUser.firstName + ' ' + this.localUser.lastName}`
    }
  },
  created () {
    this.localUser = this.user[0]
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            await this.$store.dispatch('user/UPDATE_USER', this.localUser)
            this.loading = false
            this.$router.push('/admin/user/list')
          } catch (error) {
            this.loading = false
            return false
          }
        }
      })
    }
  }
}
</script>
