import Cookie from 'cookie'
import CookieJs from 'js-cookie'
import jwtDecode from 'jwt-decode'
export const state = () => ({
  token: null,
  user: null
})
export const getters = {
  getUser: state => state.user,
  isAuth: state => Boolean(state.token),
  token: state => state.token
}
export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setUser (state, user) {
    state.user = user
  },
  clearToken (state) {
    state.token = null
  },
  clearUser (state) {
    state.user = null
  }
}
export const actions = {
  // ADMIN ACTIONS
  async ADMIN_LOGIN ({ commit, dispatch }, formData) {
    try {
      const token = await new Promise((resolve) => {
        setTimeout(() => {
          resolve('admin-token')
        }, 1000)
      })
      dispatch('setToken', token)
    } catch (error) {
      commit('SET_ERROR', error, { root: true })
      throw error
    }
  },
  // CLIENT ACTIONS
  async LOGIN ({ commit, dispatch }, formData) {
    try {
      const { token } = await this.$axios.$post('/api/login', formData)
      dispatch('setToken', token)
      dispatch('setUser', isTokenDecode(token))
    } catch (error) {
      commit('SET_ERROR', error, { root: true })
      throw error
    }
  },
  LOGOUT ({ commit }) {
    this.$axios.setToken(false)
    commit('clearToken')
    commit('clearUser')
    CookieJs.remove('jwt-token')
    this.$router.push('/login?messege=logout')
  },
  AUTOLOGIN ({ dispatch }) {
    const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']
    if (isJwtValid(token)) {
      dispatch('setToken', token)
      dispatch('setUser', isTokenDecode(token))
    } else {
      dispatch('LOGOUT')
    }
  },
  setToken ({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    CookieJs.set('jwt-token', token)
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
  }
}

function isTokenDecode (token) {
  if (!token) { return {} }
  const { login, name, role, userId } = jwtDecode(token) || {}
  return { login, name, role, userId }
}
function isJwtValid (token) {
  if (!token) { return false }
  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0
  return (new Date().getTime() / 1000) < expires
}
