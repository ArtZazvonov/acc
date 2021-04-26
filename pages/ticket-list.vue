<template>
  <div class="ticket-list">
    <div class="ticket">
      <div class="ticket-header">
        <div class="ticket-header-cols ticket-status"><span></span></div>
        <div class="ticket-header-cols ticket-number">#1</div>
        <div class="ticket-header-cols ticket-client">МБДОУ "Детский сад общеразвивающего вида №190"</div>
        <div class="ticket-header-cols ticket-phone"><a href="tel:38-59-37">38-59-37</a></div>
        <div class="ticket-header-cols ticket-address">ул. Березниковская 13-я, д. 19</div>
        <div class="ticket-header-cols ticket-edit">редактировать</div>
        <div class="ticket-header-cols ticket-more" @click.prevent="ticketOpen($event)">more</div>
      </div>
      <div class="ticket-desc">
        <p>"Пытаются составить конткракт на сайте закупок. Не могут этого сделать, т.к. в строке поиска не могут найти ни один контракт по реестровому номеру. Просят помощи. Upd: Сегодня ПК в саду не включается. Переподключение кабеля питание не помогло. UPD: Компьютер включился. С госзакупками пока не разобрались, написали письмо от сада в тех.поддержку сайта. Ждем реакции. Позвонить клиенту в конце недели."</p>
        <div class="ticket-list__item-control">
          <button type="button">Выполнена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    ticketOpen (e) {
      const item = e.target.closest('.ticket')
      item.classList.toggle('ticket-open')
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
