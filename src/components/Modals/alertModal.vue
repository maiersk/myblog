<template>
  <div class="alert_center">
    <Modal>
      <template #title>
        <h1>Alert</h1>
      </template>
      <template #body>
        <div class="container">
          <slot name="content">
            alert something
          </slot>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from '../BaseModal'

export default {
  components: {
    Modal
  }
}
</script>

<style lang="scss" scoped>
  .alert_center {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>