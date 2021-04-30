import Cookie from 'cookie'
import CookieJs from 'js-cookie'
import jwtDecode from 'jwt-decode'
export const state = () => ({
  token: null,
  userRole: null
})
export const getters = {
  isAuth: state => Boolean(state.token),
  token: state => state.token,
  userRole: state => state.userRole
}
export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setRole (state, role) {
    state.userRole = role
  },
  clearToken (state) {
    state.token = null
    state.userRole = null
  }
}
export const actions = {
  async LOGIN ({ commit, dispatch }, formData) {
    try {
      const { token, userRole } = await this.$axios.$post('/api/auth/login', formData)
      dispatch('setToken', token)
      dispatch('setRole', userRole)
    } catch (error) {
      commit('SET_ERROR', error, { root: true })
      throw error
    }
  },
  LOGOUT ({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    CookieJs.remove('jwt-token')
    this.$router.push('/login?messege=logout')
  },
  AUTOLOGIN ({ dispatch }) {
    const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']
    if (isJwtValid(token)) {
      dispatch('setToken', token)
    } else {
      dispatch('LOGOUT')
    }
  },
  setToken ({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    CookieJs.set('jwt-token', token)
  },
  setRole ({ commit }, userRole) {
    commit('setRole', userRole)
  }
}

function isJwtValid (token) {
  if (!token) { return false }
  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0
  return (new Date().getTime() / 1000) < expires
}
