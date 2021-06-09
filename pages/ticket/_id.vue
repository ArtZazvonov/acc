<template>
  <div>
    <button type="button" @click.prevent="$router.push('/ticket/list')">К списку тикетов</button>
    {{ ticket }}
    <!-- <pre>{{ ticket }}</pre> -->
    <!-- <p><strong>Дата создания: </strong>{{ ticket.date }}</p>
    <p><strong>Клиент: </strong>{{ ticket.client }}</p>
    <p><strong>Телефон: </strong>{{ ticket.phone }}</p>
    <p><strong>Адрес: </strong>{{ ticket.address }}</p>
    <p><strong>Комментарии: </strong></p>
    <div v-for="(item, index) in ticket.comments" :key="index">
      <p><strong>{{ item.date }}</strong> <span>{{ item.postedBy }}</span></p>
      <p>{{ item.text }}</p>
    </div>
    <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit">
      <ValidationProvider v-slot="{ errors }" tag="div">
        <textarea v-model="localTicket.description" type="text" rows="10" cols="40" />
        <span class="validate-error">{{ errors[0] }}</span>
      </ValidationProvider>
      <button type="submit">Сохранить</button>
      <button type="button" @click.prevent="removeTicket()">Удалить тикет</button>
    </ValidationObserver> -->
  </div>
</template>

<script>
export default {
  middleware: ['clientAuth'],
  validate ({ params }) {
    return Boolean(params.id)
  },
  async asyncData ({ store, params }) {
    const ticket = await store.dispatch('ticket/ticket', params.id)
    return { ticket }
  },
  data () {
    return {
      localTicket: {}
    }
  },
  head () {
    return {
      title: `Тикет | ${this.localTicket.client}`
    }
  },
  mounted () {
    this.localTicket = this.ticket
    this.localTicket.views = true
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate().then(async (success) => {
        if (success) {
          try {
            await this.$store.dispatch('ticket/update', this.localTicket)
            this.$router.push('/ticket/list')
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    removeTicket () {
      if (confirm('Удалить тикет?')) {
        this.$store.dispatch('ticket/remove', this.localTicket._id)
        this.$router.push('/ticket/list')
      }
    }
  }
}
</script>
