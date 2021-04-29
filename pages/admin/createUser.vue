<template>
  <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit">
    <ul>
      <p>Роли пользователей</p>
      <li>Администратор (0) - доступ к админ панели, создание других пользователей</li>
      <li>Оператор (1) - доступ к панели заявок</li>
    </ul>
    <ValidationProvider v-slot="{ errors }" tag="div" name="login" vid="login" rules="">
      <label for="login">Логин</label>
      <input v-model="formData.login" type="text" name="login">
      <span class="validate-error">{{ errors[0] }}</span>
    </ValidationProvider>
    <ValidationProvider v-slot="{ errors }" tag="div" name="password" vid="password" rules="">
      <label for="password">Пароль</label>
      <input v-model="formData.password" type="password" name="password">
      <span class="validate-error">{{ errors[0] }}</span>
    </ValidationProvider>
    <ValidationProvider v-slot="{ errors }" tag="div" name="usertype" vid="usertype" rules="">
      <label for="usertype">Роль пользователя</label>
      <select v-model="formData.role">
        <option disabled value="">Выберите один из вариантов</option>
        <option value="0">Администратор</option>
        <option value="1">Оператор</option>
      </select>
      <span>Выбрано: {{ formData.role }}</span>
      <!-- <label for="usertype">Роль пользователя</label>
      <input v-model="formData.password" type="number" name="usertype"> -->
      <span class="validate-error">{{ errors[0] }}</span>
    </ValidationProvider>
    <button type="submit">Войти</button>
  </ValidationObserver>
</template>

<script>
export default {
  layout: 'login',
  data () {
    return {
      formData: {
        login: '',
        password: '',
        role: ''
      }
    }
  },
  mounted () {
    const { messege } = this.$route.query
    switch (messege) {
      case 'login':
        alert('Выполните вход в истему')
        break
      case 'logout':
        alert('Вы вышли из системы')
        break
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate().then(async (success) => {
        if (success) {
          try {
            const form = {
              login: this.formData.login,
              password: this.formData.password,
              role: this.formData.role
            }
            await this.$store.dispatch('user/CREATE_USER', form)
            this.$router.push('/admin')
          } catch (e) {
            console.log(e)
          }
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
