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
export const actions = {}
