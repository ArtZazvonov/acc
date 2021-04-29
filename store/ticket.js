const tickets = [
  {
    id: 1,
    date: new Date(),
    client: 'МБДОУ "Детский сад общеразвивающего вида №190"',
    phone: '38-59-37',
    address: 'ул. Березниковская 13-я, д. 19',
    description: 'Пытаются составить конткракт на сайте закупок. Не могут этого сделать, т.к. в строке поиска не могут найти ни один контракт по реестровому номеру. Просят помощи. Upd: Сегодня ПК в саду не включается. Переподключение кабеля питание не помогло. UPD: Компьютер включился. С госзакупками пока не разобрались, написали письмо от сада в тех.поддержку сайта. Ждем реакции. Позвонить клиенту в конце недели.',
    status: ''
  },
  {
    id: 2,
    date: new Date(),
    client: 'МБДОУ "Детский сад общеразвивающего вида №55"',
    phone: '38-59-37',
    address: 'ул. Дубковская 18-я, д. 91',
    description: 'Пытаются составить конткракт на сайте закупок. Не могут этого сделать, т.к. в строке поиска не могут найти ни один контракт по реестровому номеру. Просят помощи. Upd: Сегодня ПК в саду не включается. Переподключение кабеля питание не помогло. UPD: Компьютер включился. С госзакупками пока не разобрались, написали письмо от сада в тех.поддержку сайта. Ждем реакции. Позвонить клиенту в конце недели.',
    status: ''
  }
]
export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async fetch () {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(tickets)
      }, 500)
    })
  },
  async fetchById ({ state }, id) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(tickets.find(ticket => ticket.id === +id))
      }, 1000)
    })
  },
  async close ({ state }, ticket) {
    await console.log('Тикет: ' + ticket.id + ' закрыт')
  },
  async update ({ state }, ticket) {
    await console.log('Тикет: ' + ticket.id + ' обновлен с текстом: ' + ticket.description)
  },
  async create (context, newTicket) {
    const maxID = tickets.reduce((acc, el) => { return acc > el.id ? acc : el.id })
    newTicket.id = maxID + 1
    newTicket.date = new Date().toLocaleString()
    newTicket.status = 'new'
    tickets.push(newTicket)
    await console.log('Тикет: ' + { newTicket } + ' добавлен')
  }
}
