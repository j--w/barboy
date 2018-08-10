<template>
    <form @submit.prevent="onSubmit">
        <div
          v-for="field in fields"
          :key="field.key"
          class="field">
            <label class="label">{{labelify(field.key)}}</label>
            <div class="control">
                <input
                  class="input" :type="field.type || 'number'"
                  :placeholder="labelify(field.key)">
            </div>
        </div>
    </form>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Pump } from '@/generated/BarState';
import { cloneDeep, startCase } from 'lodash-es';

interface FormField {
  key: string;
  type?: 'text' | 'number';
}

@Component
export default class PumpForm extends Vue {
  @Prop({default: false, type: Object, required: true}) public pump!: Pump;
  public pumpModel: Pump = cloneDeep( this.pump );

  public fields: FormField[] = [
    {
      key: 'label',
      type: 'text',
    },
    {
      key: 'gpioPin',
    },
    {
      key: 'flowRate',
    },
    {
      key: 'bottleVolume',
    },
  ];

  public labelify(val: string) {
    return startCase(val);
  }
}
</script>