import { createStore } from 'vuex';
import router from './router';

export default createStore({
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('jwtToken', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('jwrToken');
    }
  },
  actions: {
    loadToken({ commit }) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        commit('setToken', token);
        router.push('/user/:id');
      }
    }
  }
});
