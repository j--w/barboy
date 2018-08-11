<template>
  <div>
    <Pumps></Pumps>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Pumps from '@/components/configuration/Pumps.vue';

@Component({
  components: {
    Pumps,
  },
})
export default class Configure extends Vue {
}
</script>
