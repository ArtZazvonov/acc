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
  async ticketList ({ commit }) {
    try {
      return await this.$axios.$get('/api/ticket/List')
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  async ticket ({ commit }, ticketID) {
    try {
      return await this.$axios.$get(`/api/ticket/${ticketID}`)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  async update ({ commit }, ticket) {
    try {
      return await this.$axios.$put(`/api/ticket/${ticket._id}`, ticket)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  async remove ({ commit }, ticketID) {
    try {
      return await this.$axios.$delete(`/api/ticket/${ticketID}`)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  async createComments ({ commit }, newComment) {
    try {
      return await this.$axios.$post('/api/comment/create', newComment)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  }
}
