/* eslint-disable camelcase */
import { methods } from '@/api/'

export const state = () => ({
  cart: '',
  cards: [],
  categoriesWithCards: {},
  details: false,
  detailsData: {},
  counter: 1
})

export const mutations = {
  setState (state, value) {
    return (state.cards = value)
  },
  setCat (state, { key, value }) {
    return (state.categoriesWithCards[key] = value)
  },
  setCart (state, { name, value }) {
    return (state[name] = value)
  },
  toggleDetails (state) {
    return (state.details = !state.details)
  },
  setDetailsData (state, value) {
    return (state.detailsData = value)
  },
  increment: state => state.counter++,
  decrement: (state) => {
    if (state.counter > 1) {
      state.counter--
    }
  }
}

export const actions = {
  async fetchCart ({ commit }) {
    const res = await methods.getCart()
    commit('setCart', {
      name: 'cart',
      value: res.data
    })
  },
  async fetchCardInfo ({ commit }, id) {
    const res = await methods.getItemsByCategory(id)
    commit('setState', res.data)
  },
  async fetchCategoryCards ({ commit }, id) {
    const res = await methods.getItemsByCategory(id)
    commit('setCat', {
      key: id,
      value: res.data
    })
  },
  async addItemToCart ({ dispatch },
    { category_id, item_id, price, qty = 1 }) {
    await methods.addItemToCart({
      category_id,
      item_id,
      price,
      qty
    })
    dispatch('fetchCart')
  },
  async clearCart ({ dispatch }) {
    await methods.clearCart()
    dispatch('fetchCart')
  }
}

export const getters = {
  getCards (state) {
    return state.cards
  },
  getCategoriesWithCards (state) {
    return state.categoriesWithCards
  },
  getDetails (state) {
    return state.details
  },
  getDetailsData (state) {
    return state.detailsData
  },
  getCounter (state) {
    return state.counter
  },
  getCart (state) {
    return state.cart
  }
}
