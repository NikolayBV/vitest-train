<template>
  <div @click="handleClose" class="modal-container" data-test="modalLayout-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'ModalLayout',
  props: {
    closeModal: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup({ closeModal }) {
    function handleClose() {
      closeModal()
    }

    return { handleClose }
  }
})
</script>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>
