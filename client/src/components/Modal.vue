<template>
    <div class="modal" :class="{'is-active': isOpen}">
        <div class="modal-background">
            <div class="modal-card">
                <header class="modal-card-head">
                    <slot name="header"></slot>
                </header>
                <section class="modal-card-body">
                    <slot name="content"></slot>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success">Save changes</button>
                    <button class="button">Cancel</button>
                </footer>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    </div>
</template>
<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  @Component
  export default class Modal extends Vue {
    @Prop({default: false, type: Boolean}) public isOpen!: boolean;
  }
</script>
<style lang="scss" scoped>
    .modal-content {
        background: white;
    }
</style>