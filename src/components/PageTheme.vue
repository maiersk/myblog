<template>
  <div class="page-theme">
    <div>
      <slot name="title">Page Title</slot>
    </div>
    <main>
      <slot name="body">Page Body</slot>
    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .page-theme {
    main {
      
    }
  }
</style>