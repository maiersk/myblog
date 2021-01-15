<template>
  <PageTheme>
    <template #title>
      <h1>Home</h1>
    </template>
    <template #body>
      <input type="button" value="add" @click="add" />
      {{state.count}}
    </template>
  </PageTheme>
</template>

<script>
import { useStore } from "vuex";
import PageTheme from "../components/PageTheme";

export default {
  components: {
    PageTheme,
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