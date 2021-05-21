<template>
  <el-card>
    <h2 slot="header" style="text-align: center">Панель администратора</h2>
    <el-form ref="form" :model="formData" :rules="rules">
      <el-form-item label="Логин" prop="login" error>
        <el-input v-model="formData.login" />
      </el-form-item>
      <el-form-item label="Пароль" prop="password">
        <el-input v-model="formData.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click.prevent="onSubmit()">Войти</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      loading: false,
      formData: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          { required: true, messege: 'Это поле обязатеьно для заполнения', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Это поле обязатеьно для заполнения', trigger: 'blur' },
          { min: 5, message: 'Пароль не менее 6 символов', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    const { messege } = this.$route.query
    switch (messege) {
      case 'login':
        this.$message.info('Выполните вход в истему')
        break
      case 'logout':
        this.$message.success('Вы вышли из системы')
        break
      case 'session':
        this.$message.info('Вы давно не заходили, нужно авторизоваться')
        break
      case 'right':
        this.$message.info('Войдите с учатными данными администратора')
        break
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          try {
            await this.$store.dispatch('auth/LOGIN', this.formData)
            this.loading = false
            this.$router.push('/admin')
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

<style lang="sass" scoped>
</style>
