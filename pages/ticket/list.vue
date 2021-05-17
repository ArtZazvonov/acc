<template>
  <div>
    <h2 class="page-title">Список тикетов</h2>
    <div class="ticket-list">
      <!-- <div v-for="(ticket, index) in ticketList" :key="index" class="ticket">
        <div class="ticket-info">
          <div class="ticket-info__col ticket-id">#1</div>
          <div class="ticket-info__col ticket-author">
            <span>{{ ticket.createUser.name.first }}</span>
            <span>{{ ticket.createUser.name.last }}</span>
          </div>
          <div class="ticket-info__col ticket-date"><span>{{ ticket.date }}</span></div>
          <select id="status" class="ticket-info__col ticket-status" name="status" @change="onChangeTicketStatus($event, ticket)">
            <option v-for="(select, index) in status" :key="index" :value="select.val" :selected="select.val == ticket.status">{{ select.name }}</option>
          </select>
          <div class="ticket-info__col ticket-client">{{ ticket.client }}</div>
          <div class="ticket-info__col ticket-phone"><a :href="'tel:'+ticket.phone">{{ ticket.phone }}</a></div>
          <div class="ticket-info__col ticket-address">{{ ticket.address }}</div>
          <div type="button" class="ticket-edit" @click.prevent="ticketEdit(ticket._id)">
            <i class="icon-edit-solid"></i></div>
          <div class="ticket-more" @click.prevent="ticketMore($event)">
            <i class="icon-caret-down-solid"></i></div>
        </div>
        <div class="ticket-desc">
          <h3>Описание тикета:</h3>
          <p>{{ ticket.description }}</p>
          <h3>Комментарии:</h3>
          <div v-for="(item, index) in ticket.comments" :key="index">
            <pre>{{ item }}</pre>
            <p><span>{{ item.date }} </span>{{ item.text }}</p>
          </div>
          <h3>Оставить свой комментарий:</h3>
          <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit(ticket._id)">
            <ValidationProvider v-slot="{ errors }" tag="div">
              <textarea v-model="newComment.text" type="text" rows="5" />
              <span class="validate-error">{{ errors[0] }}</span>
            </ValidationProvider>
            <button type="submit" class="btn">Добавитьь комментарий</button>
          </ValidationObserver>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['clientAuth'],
  async asyncData ({ store }) {
    const ticketList = await store.dispatch('ticket/ticketList')
    return { ticketList }
  },
  data () {
    return {
      status: [
        { name: 'Новый', val: 0 },
        { name: 'В работе', val: 1 },
        { name: 'Нужен выезд', val: 2 },
        { name: 'Ожидает действия клинта', val: 3 },
        { name: 'Выполнен', val: 4 },
        { name: 'Отложен', val: 5 },
        { name: 'Закрыт', val: 6 }
      ],
      newComment: {
        text: ''
      }
    }
  },
  methods: {
    ticketMore (e) {
      e.target.closest('.ticket').querySelector('.ticket-desc').classList.toggle('ticket-desc__open')
    },
    ticketEdit (id) {
      this.$router.push({ path: `/ticket/${id}` }) // -> /ticket/id
    },
    onChangeTicketStatus (e, ticket) {
      ticket.status = e.target.value || 0
      this.$store.dispatch('ticket/update', ticket)
    },
    async onSubmit (id) {
      const newComment = {
        text: this.newComment.text,
        authorID: this.$store.getters['auth/getUser'].userId,
        ticketID: id
      }
      try {
        await this.$store.dispatch('ticket/createComment', newComment)
        // this.$router.push('/ticket/list')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
