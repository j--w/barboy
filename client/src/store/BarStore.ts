import {BarState, Pump} from '@/generated/interfaces/BarState';

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
    updateBar(state: BarStore, value: BarState): void {
      Object.assign(state.bar, value);
    },
    addPump(state: BarStore, value: Pump): void {
      state.bar.pumps.push(value);
    },
  },
};
