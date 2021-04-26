<template>
  <ValidationObserver ref="form" tag="form" @submit.prevent="formValidate">
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
        password: ''
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
    formValidate () {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.onSubmit()
        }
      })
    },
    async onSubmit () {
      try {
        const form = {
          login: this.formData.login,
          password: this.formData.password
        }
        await this.$store.dispatch('auth/LOGIN', form)
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
