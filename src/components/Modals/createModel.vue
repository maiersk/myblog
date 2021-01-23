<template>
  <Modal>
    <template #title>
      <h1>Create {{name}}</h1>
    </template>
    <template #body>
      <form class="container form-flex">
        <slot name="body">
          something
        </slot>
      </form>
    </template>
  </Modal>
</template>

<script>
import { computed } from 'vue';
import Modal from '../BaseModal'

export default {
  provide() {
    return {
      isOpen: computed({
        set: (val) => {this.open = val},
        get: () => {return this.open}
      })
    }
  },
  inject: ['modal'],
  props: {
    name: {
      type: String,
      defalut: 'Model'
    },
    modalName: {
      type: String,
      defalut: ''
    }
  },
  data() {
    return {
      open: false
    }
  },
  watch: {
    modal: {
      deep: true,
      handler(val) {
        if (val.value === this.modalName) {
          this.open = true
        }
      }
    },
    open: {
      deep: true,
      handler(val) {
        if (val === false) {
          this.modal.value = ''
        }
      }
    }
  },
  components: {
    Modal,
  },
};
</script>

<style>
</style>