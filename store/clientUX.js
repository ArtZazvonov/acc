export const state = () => ({
  asideState: false
})

export const getters = {}

export const mutations = {
  SET_ASIDE (state) {
    state.asideState = !state.asideState
  }
}
export const actions = {
  ASIDE (context) {
    context.commit('SET_ASIDE')
  }
}
