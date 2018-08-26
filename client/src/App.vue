<template>
  <div id="app">
	<Nav></Nav>
    <router-view/>
  </div>
</template>
<script lang="ts">
import '@fortawesome/fontawesome-free/js/all.js';
import { Component, Vue } from 'vue-property-decorator';
import Nav from '@/components/Nav.vue';
import { BarState } from '@/generated/interfaces/BarState';

@Component({
  components: {
    Nav,
  },
})
export default class App extends Vue {
  public created() {
    const stream = new EventSource('http://localhost:3000/state');
    stream.addEventListener('message', (event: any) => {
      const data: BarState = JSON.parse(event.data);
      this.$store.commit('BarStore/updateBar', data);
    });
  }
}
</script>
<style lang="scss">
  @import 'bulma';
</style>