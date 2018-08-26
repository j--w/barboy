<template>
    <div class="modal" :class="{'is-active': isOpen}">
        <div class="modal-background" @click.prevent="close">
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
        <div class="modal-content">
          <div class="box">
            <slot name="content"></slot>
          </div>
        </div>
    </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
  @Component
  export default class Modal extends Vue {
    @Prop({default: false, type: Boolean})
    public isOpen!: boolean;

    @Emit()
    public close(): void {
      return;
    }
  }
</script>