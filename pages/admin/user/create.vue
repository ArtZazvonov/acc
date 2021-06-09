<template>
  <el-row>
    <el-col :lg="12">
      <el-card>
        <h3 slot="header">Регистрация нового пользователя</h3>
        <el-form ref="form" :model="formData" :rules="rules" label-position="left" inline-message>
          <el-form-item label="Логин" prop="login">
            <el-input v-model="formData.login" />
          </el-form-item>
          <el-form-item label="Пароль" prop="password">
            <el-input v-model="formData.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Имя">
            <el-input v-model="formData.firstName" />
          </el-form-item>
          <el-form-item label="Фамилия">
            <el-input v-model="formData.lastName" />
          </el-form-item>
          <el-form-item label="Роль пользователя">
            <el-select v-model="formData.role" placeholder="Выберите права пользователя">
              <el-option label="Администратор" value="0">Администратор</el-option>
              <el-option label="Оператор" value="1">Оператор</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Фотография">
            <el-upload drag :on-change="userPhotoUpload" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false">
              <i class="el-icon-upload" />
              <div class="el-upload__text">Поместите файл здесь или нажмите <em>чтобы загрузить</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click.prevent="onSubmit()">Создать</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
export default {
  layout: 'admin',
  middleware: ['adminAuth'],
  data () {
    return {
      loading: false,
      formData: {
        firstName: '',
        lastName: '',
        login: '',
        password: '',
        role: {
          name: '',
          typeNumber: ''
        },
        image: null
      },
      rules: {
        login: [
          { required: true, messege: 'Это поле обязатеьно для заполнения', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Это поле обязатеьно для заполнения', trigger: 'blur' },
          { min: 5, message: 'Пароль не менее 5 символов', trigger: 'blur' }
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
    }
  },
  methods: {
    userPhotoUpload (file) {
      this.formData.image = file.raw
    },
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          try {
            console.log(this.formData)
            // await this.$store.dispatch('user/CREATE_USER', this.formData)
            // this.loading = false
            // this.$message.success('Пользователь создан')
            // this.$router.push('/admin/user/list')
          } catch (error) {
            // this.loading = false
            // this.$message.warning('Ошибка при создании пользователя')
            // console.log(error)
          }
        } else {
          this.$message.warning('Ошибка при создании пользователя')
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
