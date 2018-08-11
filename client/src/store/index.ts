import Vue from 'vue';
import Vuex from 'vuex';
import BarStore from './BarStore';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    BarStore,
  },
});
