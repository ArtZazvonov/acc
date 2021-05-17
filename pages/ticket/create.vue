<template>
  <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit">
    <ValidationProvider v-slot="{ errors }" tag="div" name="client" vid="client" rules="">
      <label for="client">Клиент</label>
      <input v-model="formData.client" type="text" name="client">
      <span class="validate-error">{{ errors[0] }}</span>
    </ValidationProvider>
    <ValidationProvider v-slot="{ errors }" tag="div" name="phone" vid="phone" rules="">
      <label for="client">Телефон для связи</label>
      <input v-model="formData.phone" type="phone" name="phone">
      <span class="validate-error">{{ errors[0] }}</span>
    </ValidationProvider>
    <ValidationProvider v-slot="{ errors }" tag="div" name="address" vid="address" rules="">
      <label for="client">Адрес</label>
      <input v-model="formData.address" type="text" name="address">
      <span class="validate-error">{{ errors[0] }}</span>
    </ValidationProvider>
    <ValidationProvider v-slot="{ errors }" tag="div" name="description" vid="description" rules="">
      <label for="client">Описание проблемы</label>
      <textarea v-model="formData.description" type="text" name="description" rows="10" />
      <span class="validate-error">{{ errors[0] }}</span>
    </ValidationProvider>
    <button type="submit">Создать</button>
  </ValidationObserver>
</template>

<script>
export default {
  middleware: ['clientAuth'],
  data () {
    return {
      formData: {
        client: '',
        phone: '',
        address: '',
        description: '',
        userID: this.$store.getters['auth/getUser'].userId || ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate().then(async (success) => {
        if (success) {
          try {
            await this.$store.dispatch('ticket/create', this.formData)
            this.$router.push('/ticket/list')
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
