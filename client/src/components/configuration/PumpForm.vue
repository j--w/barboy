<template>
    <form @submit.prevent="onSubmit">
      <div
        v-show="hasErrors"
        class="notification is-danger">
        <p
          v-for="(err, index) in parsedErrors"
          :key="index"
          >
          {{err}}
        </p>
      </div>
      <div
        v-for="field in fields"
        :key="field.key"
        class="field">
          <label class="label">{{labelify(field.key)}}</label>
          <div class="control">
            <input
              v-if="field.type === 'text'"
              class="input"
              type="text"
              v-model="pumpModel[field.key]"
              :placeholder="labelify(field.key)">
            <input
              v-else
              class="input"
              type="number"
              v-model.number="pumpModel[field.key]"
              :placeholder="labelify(field.key)">
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button @click.prevent="save" class="button is-success">Submit</button>
          </div>
          <div class="control">
            <button class="button" @click.prevent="cancel">Cancel</button>
          </div>
        </div>
    </form>
</template>
<script lang="ts">
import axios from 'axios';
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import { Pump } from '@/generated/interfaces/BarState';
import { cloneDeep, startCase, isNil } from 'lodash-es';

const pumpSchema =  require('@/generated/schema/Pump.json'); // tslint:disable-line no-var-requires
const ingredientSchema =  require('@/generated/schema/Ingredient.json'); // tslint:disable-line no-var-requires
const Ajv = require('ajv'); // tslint:disable-line no-var-requires
const ajv: any = new Ajv({allErrors: true});
ajv.addSchema(ingredientSchema, 'Ingredient.json');
ajv.addSchema(pumpSchema, 'Pump.json');

enum FieldTypes {
  Text,
  Number,
}

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
  public errors: any[] = [];

  public labelify(val: string): string {
    return startCase(val);
  }

  public async save(): Promise<void> {
    if (ajv.validate('Pump.json', this.pumpModel) === false) {
      this.errors = ajv.errors;
    } else {
      this.errors = [];
      const isPost = isNil(this.pumpModel.id);
      const apiUrl = `${process.env.VUE_APP_API_URL}/pumps`;
      try {
        await axios({
          method: isPost ? 'post' : 'put',
          data: this.pumpModel,
          url: isPost ? apiUrl : `${apiUrl}/${this.pumpModel.id}`,
        });
        this.close();
      } catch ( err ) {
        this.errors = [
          {
            dataPath: '',
            message: 'Error saving this pump',
          },
        ];
      }
    }
  }

  @Emit()
  public close(): void {
    return;
  }

  public get parsedErrors() {
    return this.errors.map( (err) => {
      const field = this.labelify(err.dataPath.split('.').slice(-1)[0]);
      return `${field} ${err.message}`;
    });
  }

  public get hasErrors() {
    return this.errors.length > 0;
  }
}
</script>