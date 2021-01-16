<template>
  <page-theme>
    <template #title>
      <h1>Home</h1>
    </template>
    <template #body>
      <input type="button" value="add" @click="add" />
      {{state.count}}
    </template>
  </page-theme>
</template>

<script>
import { useStore } from "vuex";
import pageTheme from "../components/pageTheme";

export default {
  components: {
    pageTheme,
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