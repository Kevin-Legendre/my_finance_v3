export default {
  signin ({ commit }, data) {
    return this.$axios.post('login/signin', data)
      .then((res) => commit('init', { token: res.data }))
  },
  signup ({ commit }, data) {
    return this.$axios.post('login/signup', data)
      .then((res) => commit('init', { token: res.data }))
  },
  getUser ({ commit }) {
    return this.$axios.get('me')
      .then((res) => commit('init', { user: res.data }))
  },
  updateUser ({ dispatch }, data) {
    return this.$axios.put('user', data).then(() => dispatch('getUser'))
  }
}
