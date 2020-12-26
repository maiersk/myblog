<template>
  <PageTheme>
    <template #title>
      <h1>Blog</h1>
    </template>
    <template #body>
      <blogList /> 
    </template>
  </PageTheme>
</template>

<script>
import PageTheme from "../components/PageTheme";
import blogList from '../components/blogList';

export default {
  components: {
    PageTheme,
    blogList,
  },
}
</script>

<style>

</style>