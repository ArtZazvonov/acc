<template>
  <div class="ticket-list">
    <div v-for="(ticket, index) in ticketList" :key="index" class="ticket">
      <div class="ticket-header">
        <div class="ticket-header-cols ticket-date"><span>{{ ticket.date }}</span></div>
        <select id="status" class="ticket-header-cols ticket-status" name="status" @change="onChangeTicketStatus($event, ticket)">
          <option v-for="(select, index) in status" :key="index" :value="select.val" :selected="select.val == ticket.status">{{ select.name }}</option>
        </select>
        <div class="ticket-header-cols ticket-number"># {{ ticket._id }}</div>
        <div class="ticket-header-cols ticket-client">{{ ticket.client }}</div>
        <div class="ticket-header-cols ticket-phone"><a :href="'tel:'+ticket.phone">{{ ticket.phone }}</a></div>
        <div class="ticket-header-cols ticket-address">{{ ticket.address }}</div>
        <button type="button" class="ticket-header-cols ticket-edit" @click.prevent="ticketEdit(ticket._id)">edit</button>
        <div class="ticket-header-cols ticket-more" @click.prevent="ticketMore($event)">more</div>
      </div>
      <div class="ticket-desc">
        <p>{{ ticket.description }}</p>
      </div>
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
      ]
    }
  },
  methods: {
    ticketMore (e) {
      e.target.closest('.ticket').classList.toggle('ticket-open')
    },
    ticketEdit (id) {
      this.$router.push({ path: `/ticket/${id}` }) // -> /ticket/id
    },
    onChangeTicketStatus (e, ticket) {
      ticket.status = e.target.value || 0
      this.$store.dispatch('ticket/update', ticket)
    }
  }
}
</script>

<style lang="scss" scoped>
  .ticket{
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid blue;
    &-header{
      display: flex;
      align-items: center;
      width: 100%;
      &-cols{
        padding: 5px 10px;
      }
    }
    &-desc{
      height: 0;
      max-height: 0px;
      overflow: hidden;
      transition: 0.4s;
    }
    &-status{
      span{
        display: block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: green;
      }
    }
    &-edit{
      cursor: pointer;
    }
    &-more{
      cursor: pointer;
    }
  }
  .ticket-open{
    .ticket-desc{
      height: auto;
      max-height: 350px;
    }
  }
</style>
