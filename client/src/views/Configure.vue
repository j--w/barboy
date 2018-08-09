<template>
  <section class="section pumps">
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
        v-for="pump in pumps"
        :key="pump.label"
        class="pumps__row">
        <td>{{pump.label}}</td>
        <td>{{pump.isBusy}}</td>
        <td>{{pump.gpioPin}}</td>
        <td>{{pump.flowRate}}</td>
        <td>{{getIngredient(pump)}}</td>

        <td>
          <button class="button is-primary" @click.prevent="editPump(pump)">
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
    <modal :is-open="isEditDialogOpen"></modal>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Pump } from '@/generated/BarState';
import Modal from '@/components/Modal.vue';
@Component({
  components: {
    Modal,
  },
})
export default class Configure extends Vue {
  public currentlyEditingPump: Pump = {label: '', isBusy: false, flowRate: 0, gpioPin: 4};
  public pumps: Pump[] = [
    {
      label: 'One',
      isBusy: false,
      gpioPin: 17,
      flowRate: 390,
    },
    {
      label: 'Two',
      isBusy: false,
      gpioPin: 18,
      flowRate: 390,
      ingredient: {
        label: 'London Dry Gin',
      },
    },
  ];

  public getIngredient(pump: Pump) {
    return pump.ingredient && pump.ingredient.label ? pump.ingredient.label : 'Not Set';
  }

  public editPump(pump: Pump) {
    this.currentlyEditingPump = pump;
  }

  public get isEditDialogOpen() {
    return this.currentlyEditingPump !== undefined && this.currentlyEditingPump.label !== '';
  }

}
</script>
