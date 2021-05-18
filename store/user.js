export const state = () => ({})
export const getters = {}
export const mutations = {}
export const actions = {
  async CREATE_USER ({ commit }, newUser) {
    try {
      await this.$axios.post('/api/admin/user/create', newUser)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  async REMOVE_USER ({ commit }, userID) {
    try {
      return await this.$axios.delete(`/api/admin/user/${userID}`)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  async USER_ID ({ commit }, userID) {
    try {
      const user = await this.$axios.get(`/api/admin/user/${userID}`)
      return user.data
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  async USER_LIST ({ commit }) {
    try {
      const users = await this.$axios.get('/api/admin/user/list')
      return users.data
    } catch (error) {
      commit('SET_ERROR', error, { root: true })
      throw error
    }
  },
  async UPDATE_USER ({ commit }, userData) {
    try {
      return await this.$axios.$put(`/api/admin/user/${userData._id}`, userData)
    } catch (error) {
      commit('SET_ERROR', error, { root: true })
      throw error
    }
  }
}
