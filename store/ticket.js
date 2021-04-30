// const tickets = [
//   {
//     id: 1,
//     date: new Date(),
//     client: 'МБДОУ "Детский сад общеразвивающего вида №190"',
//     phone: '38-59-37',
//     address: 'ул. Березниковская 13-я, д. 19',
//     description: 'Пытаются составить конткракт на сайте закупок. Не могут этого сделать, т.к. в строке поиска не могут найти ни один контракт по реестровому номеру. Просят помощи. Upd: Сегодня ПК в саду не включается. Переподключение кабеля питание не помогло. UPD: Компьютер включился. С госзакупками пока не разобрались, написали письмо от сада в тех.поддержку сайта. Ждем реакции. Позвонить клиенту в конце недели.',
//     status: ''
//   },
//   {
//     id: 2,
//     date: new Date(),
//     client: 'МБДОУ "Детский сад общеразвивающего вида №55"',
//     phone: '38-59-37',
//     address: 'ул. Дубковская 18-я, д. 91',
//     description: 'Пытаются составить конткракт на сайте закупок. Не могут этого сделать, т.к. в строке поиска не могут найти ни один контракт по реестровому номеру. Просят помощи. Upd: Сегодня ПК в саду не включается. Переподключение кабеля питание не помогло. UPD: Компьютер включился. С госзакупками пока не разобрались, написали письмо от сада в тех.поддержку сайта. Ждем реакции. Позвонить клиенту в конце недели.',
//     status: ''
//   }
// ]
export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async create ({ commit }, newTicket) {
    try {
      return await this.$axios.$post('/api/ticket/create', newTicket)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  async lList ({ commit }) {
    try {
      return await this.$axios.$get('/api/ticket/lList')
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  async ticket ({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/ticket/${id}`)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  async close ({ state }, ticket) {
    await console.log('Тикет: ' + ticket.id + ' закрыт')
  },
  async update ({ state }, ticket) {
    await console.log('Тикет: ' + ticket.id + ' обновлен с текстом: ' + ticket.description)
  }
}
