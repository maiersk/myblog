<template>
  <div class="page-theme">
    <div class="container title_div">
      <div class="path">
        <faIcon class="faicon" :icon="icon"></faIcon>
      </div> 
      <slot name="title">Page Title</slot>
    </div>
    <main class="container">
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
    padding: 0.25rem;
    border-radius: 5px;
    flex-grow: 1; //使用剩余高度

    .title_div {
      background-color: #282828;
      border: 1px solid #303030;
      display: flex;  
      align-items: center;
      box-shadow: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.12);
      border-radius: 2px;
      padding: 0.5rem;
    }
    
    .path {
      .faicon {
        width: 18px;
        margin-right: 0.5rem;
      }
      text-align: left;
    }
    
    // > main {
    // }
    // > div {
    //   @extend main;
    // }
  }
</style>