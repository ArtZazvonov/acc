<template>
  <div class="ticket-list">
    <div v-for="(ticket, index) in tickets" :key="index" class="ticket">
      <div class="ticket-header">
        <div class="ticket-header-cols ticket-date"><span>{{ ticket.date }}</span></div>
        <div class="ticket-header-cols ticket-status"><span></span><b>{{ ticket.status }}</b></div>
        <div class="ticket-header-cols ticket-number"># {{ ticket.id }}</div>
        <div class="ticket-header-cols ticket-client">{{ ticket.client }}</div>
        <div class="ticket-header-cols ticket-phone"><a :href="'tel:'+ticket.phone">{{ ticket.phone }}</a></div>
        <div class="ticket-header-cols ticket-address">{{ ticket.address }}</div>
        <button type="button" class="ticket-header-cols ticket-edit" @click.prevent="ticketEdit(ticket)">edit</button>
        <div class="ticket-header-cols ticket-more" @click.prevent="ticketMore($event)">more</div>
      </div>
      <div class="ticket-desc">
        <p>{{ ticket.description }}</p>
        <button type="button" @click.prevent="ticketClose(ticket)">Выполнена</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ store }) {
    const tickets = await store.dispatch('ticket/lList')
    return { tickets }
  },
  methods: {
    ticketMore (e) {
      const item = e.target.closest('.ticket')
      item.classList.toggle('ticket-open')
    },
    ticketEdit (ticket) {
      this.$router.push(`/ticket/${ticket._id}`)
    },
    ticketClose (ticket) {
      if (confirm('Закрыть данный тикет?')) {
        this.$store.dispatch('ticket/close', ticket)
        this.tickets = this.tickets.filter(p => p.id !== ticket.id)
      }
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
