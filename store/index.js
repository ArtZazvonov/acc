import Cookie from 'cookie'
export const state = () => ({
  error: null
})
export const getters = {
  isError: state => state.error
}
export const mutations = {
  SET_ERROR (state, error) {
    state.error = error
  },
  CLEAR_ERROR (state) {
    state.error = null
  }
}
export const actions = {
  async nuxtServerInit ({ dispatch }) {
    const cookieStr = process.browser ? document.cookie : this.app.context.req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']
    await dispatch('auth/AUTOLOGIN')
    await dispatch('auth/setUser', token)
  }
}
