import Cookie from 'cookie'
export const state = () => ({
  error: null,
  status: [
    { name: 'Новый', val: 0 },
    { name: 'В работе', val: 1 },
    { name: 'Выезд', val: 2 },
    { name: 'Ожидание', val: 3 },
    { name: 'Выполнен', val: 4 },
    { name: 'Отложен', val: 5 },
    { name: 'Закрыт', val: 6 }
  ]
})
export const getters = {
  isError: state => state.error,
  status: state => state.status
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
    if (token) {
      await dispatch('auth/AUTOLOGIN')
      await dispatch('auth/setUser', token)
    }
  }
}
