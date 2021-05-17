export const state = () => ({})
export const getters = {}
export const mutations = {}
export const actions = {
  async CREATE_USER ({ commit }, newUser) {
    try {
      await this.$axios.post('/api/user/admin/create', newUser)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  async USER_LIST ({ commit }) {
    try {
      await this.$axios.get('/api/user/admin/userList')
    } catch (error) {
      commit('SET_ERROR', error, { root: true })
      throw error
    }
  }
}
