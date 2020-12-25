<template>
  <div class="modal">
    <section @click="close()"></section>
    <div class="modal-body">
      <h1>
        <slot name="title"></slot>
      </h1>
      <main>
        <slot name="body"></slot>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    close() {
      this.isOpen = false;
      this.$emit("close");
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    section {
      position: absolute;
      top: 0;
      width: 100vw;
      height: 100vh;
      background: rgba($color: #303030, $alpha: .7);
      z-index: 20;
    }
    .modal-body {
      position: absolute;
      top: 0;
      z-index: 30;
    }
  }
</style>