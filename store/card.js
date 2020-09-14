import axios from 'axios'

export const state = () => ({
  cards: []
})

export const mutations = {
  setState (state, value) {
    return (state.cards.push(value))
  }
}

export const actions = {
  async fetchCardInfo (state, id) {
    const res = await axios.get(`https://vsem-edu-oblako.ru/singlemerchant/api/loadItemByCategory/?merchant_keys=929990d3b27944af404a5eb3ee1ec4f6&lang=ru&device_id=XXX_555_&device_plarform=site&json=1&cat_id=${id}`)
    return state.commit('setState', {
      name: id,
      value: res.data.details.data
    })
  }
}

export const getters = {
  getCard (state) {
    return state.cards
  }
}
