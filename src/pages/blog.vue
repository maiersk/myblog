<template>
  <page-theme>
    <template #title>
      <h1>Blog</h1>
    </template>
    <template #body>
      <list-blogs /> 
    </template>
  </page-theme>
</template>

<script>
import pageTheme from "../components/pageTheme";
import listBlogs from '../components/listBlogs';

export default {
  components: {
    pageTheme,
    listBlogs,
  },
}
</script>

<style>

</style>