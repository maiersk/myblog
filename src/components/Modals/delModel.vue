<template>
  <Modal>
    <template #title>
      <h1>Delete {{name}}</h1>
    </template>
    <template #body>
      <form class="container form-flex">
        <div class="form-group">
          <label>Select {{name}}:</label>
          <select class="input_select" ref="selectRef" @change="selectId()">
            <option id="-1">select id</option>
            <option v-for="model in list.value.data" :key="model.id" :id="model.id">
              {{model?.name ?? model?.title ?? model.id}}
            </option>
          </select>
        </div>

        <slot name="body">
          something
        </slot>

        <div class="btns block-center">
          <button class="btn btn-theme text-c-red"
            @click.prevent="this.$emit('isClick')"
          >
            Delete {{name}}
          </button>
        </div>
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