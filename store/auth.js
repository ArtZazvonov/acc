export const state = () => ({
  token: null
})
export const getters = {
  isAuth: state => Boolean(state.token),
  token: state => state.token
}
export const mutations = {
  setToken (state, payload) {
    state.token = payload
  },
  clearToken (state) {
    state.token = null
  }
}
export const actions = {
  async LOGIN ({ commit, dispatch }, payload) {
    try {
      const { token } = await this.$axios.$post('/api/auth/login', payload)
      console.log(token)
      dispatch('setToken', token)
    } catch (error) {
      commit('SET_ERROR', error, { root: true })
      throw error
    }
  },
  setToken ({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
  },
  LOGOUT ({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    this.$router.push('/login?messege=logout')
  }
}
