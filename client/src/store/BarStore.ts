import {BarState, Pump} from '@/generated/BarState';

export interface BarStore {
  bar: BarState;
}

export default {
  namespaced: true,
  state: {
    bar: {
      isBusy: false,
      pumps: [],
    } as BarState,
  },
  mutations: {
    updateBar(state: BarStore, value: BarState) {
      Object.assign(state.bar, value);
    },
    addPump(state: BarStore, value: Pump) {
      state.bar.pumps.push(value);
    },
  },
};
