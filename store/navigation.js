import { methods } from '@/api/'

export const state = () => ({
  navItems: []
})

export const mutations = {
  setState (state, { name, value }) {
    return (state[name] = value)
  }
}

export const actions = {
  async fetchNavItems ({ commit }) {
    const res = await methods.getNavigation()
    commit('setState', {
      name: 'navItems',
      value: res.data
    })
  }
}

export const getters = {
  getNavItems (state) {
    return state.navItems
  }
}
