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
  setUser (state, authUser) {
    state.user = authUser
  },
  clearToken (state) {
    state.token = null
  },
  clearUser (state) {
    state.user = null
  }
}
export const actions = {
  async LOGIN ({ commit, dispatch }, formData) {
    try {
      const { token } = await this.$axios.$post('/api/login', formData)
      await dispatch('setToken', token)
      await dispatch('setUser', token)
    } catch (error) {
      commit('SET_ERROR', error, { root: true })
      throw error
    }
  },
  AUTOLOGIN ({ commit, dispatch }) {
    try {
      const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie
      const cookies = Cookie.parse(cookieStr || '') || {}
      const token = cookies['jwt-token']
      if (isJwtValid(token)) {
        dispatch('setToken', token)
      } else {
        dispatch('LOGOUT')
      }
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
  async setUser ({ commit, dispatch }, token) {
    if (token) {
      const jwtDecode = isTokenDecode(token)
      try {
        const user = await this.$axios.$get(`/api/authorizedUser/${jwtDecode.userId}`)
        commit('setUser', user)
      } catch (error) {
        commit('SET_ERROR', error, { root: true })
        throw error
      }
    } else {
      dispatch('LOGOUT')
    }
  },
  setToken ({ commit }, token) {
    this.$axios.setToken(token, 'Bearer')
    commit('setToken', token)
    CookieJs.set('jwt-token', token)
  }
}

function isTokenDecode (token) {
  if (!token) { return {} }
  const { role, userId } = jwtDecode(token) || {}
  return { role, userId }
}
function isJwtValid (token) {
  if (!token) { return false }
  const jwtData = jwtDecode(token) || {}
  const expires = jwtData.exp || 0
  return (new Date().getTime() / 1000) < expires
}
