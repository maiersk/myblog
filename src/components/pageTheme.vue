<template>
  <div class="page-theme">
    <div class="path">
      <faIcon class="faicon" :icon="icon"></faIcon>
      <span>{{path}}</span>
    </div>    
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
  data() {
    return {
      icon: [],
      path: '',
    }
  },
  beforeMount() {
    this.icon = this.$router.currentRoute.value.meta.icon;
    this.path = this.$router.currentRoute.value.path;
    // console.log({...this.$router});
  },
}
</script>

<style lang="scss" scoped>
  .page-theme {
    height: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    
    .path {
      .faicon {
        width: 18px;
        margin-right: 0.5rem;
      }
      text-align: left;
    }
    
    > main {
      margin: 0.5rem;
      padding: 0.5rem;
    }
    > div {
      @extend main;
    }
  }
</style>