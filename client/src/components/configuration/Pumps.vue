<template>
  <section class="section pumps">
    <div class="box">
      <button
        class="button is-primary"
        @click.prevent="addPump">
        Add Pump &nbsp;<i class="fas fa-plus"></i>
      </button>
      <table class="table is-fullwidth">
        <tr>
          <th>Label</th>
          <th>Busy?</th>
          <th>GPIO Pin</th>
          <th>Flow Rate</th>
          <th>Ingredient</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        <tr
          v-for="(pump, index) in barStore.bar.pumps"
          :key="index"
          class="pumps__row">
          <td>{{pump.label}}</td>
          <td>{{pump.isBusy}}</td>
          <td>{{pump.gpioPin}}</td>
          <td>{{pump.flowRate}}</td>
          <td>{{getIngredient(pump)}}</td>
          <td>
            <button
              class="button is-primary"
              @click.prevent="editPump(pump)">
              <i class="fas fa-edit"></i>
            </button>
          </td>
          <td>
            <button class="button is-danger">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </table>
    </div>
    <modal
      :is-open="isPumpDialogOpen"
      @close="closeDialog">
      <template slot="header">
        Save Pump
      </template>
      <template slot="content">
        <pump-form
          v-if="activePump && isPumpDialogOpen"
          :pump="activePump">
        </pump-form>
      </template>
    </modal>
  </section>
</template>
<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import { BarStore } from '@/store/BarStore';
import { Pump } from '@/generated/interfaces/BarState';
import Modal from '@/components/Modal.vue';
import PumpForm from './PumpForm.vue';
import {
  State,
} from 'vuex-class';
@Component({
  components: {
    Modal,
    Pumps,
    PumpForm,
  },
})
export default class Pumps extends Vue {
  @State('BarStore') public barStore!: BarStore;

  public activePump: Pump | null = null;
  public isPumpDialogOpen: boolean = false;

  public getIngredient(pump: Pump): string {
    return pump.ingredient && pump.ingredient.label ? pump.ingredient.label : 'Not Set';
  }

  public editPump(pump: Pump): void {
    this.activePump = pump;
    this.openDialog();
  }

  public addPump(): void {
    this.activePump = {
      label: '',
      isBusy: false,
      flowRate: 0,
      gpioPin: 4,
    };
    this.openDialog();
  }

  public openDialog(): void {
    this.isPumpDialogOpen = true;
  }

  public closeDialog(): void {
    this.isPumpDialogOpen = false;
  }

  public mounted(): void {
    this.$store.commit('BarStore/addPump',
    {
      label: 'Two',
      isBusy: false,
      gpioPin: 18,
      flowRate: 390,
      ingredient: {
        label: 'London Dry Gin',
      },
    } as Pump,
    );
  }
}
</script>