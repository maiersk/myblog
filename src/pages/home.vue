<template>
  <page-theme>
    <template #title>
      <h1>Home</h1>
    </template>
    <template #body>
      <list-blogs />
    </template>
  </page-theme>
</template>

<script>
import { useStore } from "vuex";
import pageTheme from "../components/pageTheme";
import listBlogs from "../components/listBlogs";

export default {
  components: {
    pageTheme,
    listBlogs,
  },
  setup() {
    const sotre = useStore();
    const state = sotre.state;

    function add() {
      sotre.commit("add");
    }

    return {
      state,
      add
    }
  },
};
</script>


<style lang="scss" scoped>
</style>