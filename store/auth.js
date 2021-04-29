export const state = () => ({
  token: null
})
export const getters = {
  isAuth: state => Boolean(state.token)
}
export const mutations = {
  SET_TOKEN (state, payload) {
    state.token = payload
  },
  SET_ClEAR_TOKEN (state) {
    state.token = null
  }
}
export const actions = {
  async LOGIN ({ commit, dispatch }, payload) {
    try {
      const { token } = await this.$axios.$post('/api/auth/login', payload)
      console.log(token)
      dispatch('LOGIN_TOKEN', token)
    } catch (e) {
      commit('SET_ERROR', e, { root: true })
      throw e
    }
  },
  LOGIN_TOKEN ({ commit }, payload) {
    commit('SET_TOKEN', payload)
  },
  LOGOUT ({ commit }) {
    commit('SET_ClEAR_TOKEN')
    this.$router.push('/login?messege=logout')
  }
}
