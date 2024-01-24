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

<template>
  <div @click="handleClose" class="modal-container" data-test="modalLayout-container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Затемнение фона */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  width: 400px; /* или другой желаемый размер */
  text-align: center;
}
</style>
