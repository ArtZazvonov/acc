export const state = () => ({})
export const getters = {}
export const mutations = {}
export const actions = {
  async CREATE_USER ({ commit }, payload) {
    try {
      await this.$axios.post('/api/user/admin/create', payload)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  }
}
