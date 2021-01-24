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

        <div class="btns block-center">
          <button class="btn btn-theme text-c-green"
            @click.prevent="this.$emit('isClick')"
          >
            Add {{name}}
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
import { computed } from 'vue'
import Modal from '../BaseModal'

export default {
  emits: {
    isClick: null,
    selectId: null,
  },
  components: {
    Modal,
  },
  provide() {
    return {
      isOpen: computed({
        set: (val) => {this.open = val},
        get: () => {return this.open}
      })
    }
  },
  inject: ['strModal', 'objModel', 'list'],
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
    strModal: {
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
          this.strModal.value = ''
        }
      }
    },
  },
  methods: {
    // 给editModel和delModel使用
    selectId() {
      const selectRef = this.$refs.selectRef
      const id = selectRef.selectedOptions[0].getAttribute('id')
      this.$emit('selectId', id)
    },
  }
};
</script>

<style>
</style>