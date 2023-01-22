
import * as Vue from 'vue'
import api from './api'

export default {
  state: () => ({
    token: null,
    loading: false,
    user: null
  }),
  mutations: {
    init (state, data) {
      for (const key in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(key)) {
          Vue.set(state, key, data[key])
        }
      }
    },
    logout (state) {
      state.token = null
      state.user = null
      state.loading = false
      delete this.$axios.defaults.headers.common.Authorization
    }
  },
  actions: {
    ...api,
    async loadContext ({ dispatch }) {
      await dispatch('getUser')
      // await Promise.all([
      //   dispatch(''),
      // get les infos
      // ])
    },
    load ({ commit, state, dispatch }) {
      if (state.loading) {
        return
      }

      this.$axios.defaults.headers.common.Authorization = 'Bearer ' + state.token
      commit('init', { loading: true })

      setImmediate(async () => {
        try {
          await dispatch('loadContext')
        } catch (err) {
          return commit('logout')
        }

        commit('init', { loading: false })
      })
    }
  }
}
