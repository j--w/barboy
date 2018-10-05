import axios from 'axios';
import {BarState, Pump, Ingredient} from '@/generated/interfaces/BarState';

export interface BarStore {
  bar: BarState;
  ingredients: Ingredient[];
}

export default {
  namespaced: true,
  state: {
    bar: {
      isBusy: false,
      pumps: [],
      ingredients: [],
      recipes: [],
    } as BarState,
    ingredients: [] as Ingredient[],
  },
  mutations: {
    updateBar(state: BarStore, value: BarState): void {
      Object.assign(state.bar, value);
    },
    addPump(state: BarStore, value: Pump): void {
      state.bar.pumps.push(value);
    },
  },
  actions: {
    async deletePump({}, id: number) {
      console.log(id);
      try {
        await axios.delete(`http://localhost:3000/pumps/${id}`);
      } catch (error) {
        console.log(error);
      }

    },
  },
};
