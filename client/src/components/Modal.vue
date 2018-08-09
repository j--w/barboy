<template>
    <div class="modal" :class="{'is-active': isOpen}">
        <div class="modal-background"></div>
            <div class="modal-content">
                <!-- Any other Bulma elements you want -->
            </div>
        <button class="modal-close is-large" aria-label="close"></button>
    </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  @Component
  export default class Modal extends Vue {
    @Prop({default: false, type: Boolean}) public isOpen!: boolean;
  }
</script>