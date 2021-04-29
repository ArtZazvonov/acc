<template>
  <div>
    <button type="button" @click.prevent="$router.push('/ticket/list')">К списку тикетов</button>
    <p>{{ ticket.id }}</p>
    <p>{{ ticket.date }}</p>
    <p>{{ ticket.client }}</p>
    <p>{{ ticket.phone }}</p>
    <p>{{ ticket.address }}</p>
    <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit">
      <ValidationProvider v-slot="{ errors }" tag="div">
        <textarea v-model="formData.description" type="text" rows="10" cols="40" />
        <span class="validate-error">{{ errors[0] }}</span>
      </ValidationProvider>
      <button type="submit">Сохранить</button>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    return Boolean(params.id)
  },
  async asyncData ({ store, params }) {
    const ticket = await store.dispatch('ticket/fetchById', params.id)
    return { ticket }
  },
  data () {
    return {
      formData: {
        id: '',
        description: ''
      }
    }
  },
  head () {
    return {
      title: `Тикет | #${this.ticket.id}`
    }
  },
  created () {
    this.formData.id = this.ticket.id
    this.formData.description = this.ticket.description
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate().then(async (success) => {
        if (success) {
          try {
            const form = {
              id: this.formData.id,
              description: this.formData.description
            }
            await this.$store.dispatch('ticket/update', form)
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
