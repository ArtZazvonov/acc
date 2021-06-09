<template>
  <v-card max-width="580">
    <v-card-title>Форма создания тикета</v-card-title>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="formData.client" label="Клиент" :rules="rules.client" />
        <v-text-field v-model="formData.address" label="Адрес" :rules="rules.address" />
        <v-text-field v-model="formData.phone" label="Телефон" :rules="rules.phone" />
        <v-textarea v-model="formData.description" name="input-7-1" label="Описание" :rules="rules.description" />
        <v-select v-model="formData.executor" :items="executorList" :item-text="item => item.firstName +' '+ item.lastName" item-value="_id" label="Исполнитель" />
        <v-btn color="success" :loading="loading" @click.prevent="onSubmit">Отправить</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  middleware: ['clientAuth'],
  async asyncData ({ store }) {
    try {
      const executorList = await store.dispatch('user/executorList')
      return { executorList }
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      loading: false,
      formData: {
        ticketAuthor: this.$store.getters['auth/getUser'] || {},
        client: '',
        phone: '',
        address: '',
        description: '',
        executor: null
      },
      rules: {
        client: [
          v => !!v || 'Обязательное поле',
          v => (v && v.length >= 10) || 'Имя клиента не должно быть меньше 10 символов'
        ],
        address: [
          v => !!v || 'Обязательное поле',
          v => (v && v.length >= 10) || 'Адрес клиента не должн быть меньше 10 символов'
        ],
        phone: [
          v => !!v || 'Обязательное поле',
          v => /^\+?[78][-\\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(v) || 'Не верный формат'
        ],
        description: [
          v => !!v || 'Обязательное поле',
          v => (v && v.length >= 15) || 'Описание не должн быть меньше 15 символов'
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch('ticket/create', this.formData)
          this.$router.push('/ticket/list')
        } catch (e) {
          console.log(e)
        }
      }
    },
    onReset () {
      this.$refs.form.reset()
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
