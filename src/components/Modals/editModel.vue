<template>
  <Modal>
    <template #title>
      <h1>Edit {{name}}</h1>
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
import createModel from './createModel'

export default {
  extends: createModel,

}
</script>

<style>

</style>