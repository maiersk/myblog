<template>
  <list-tags></list-tags>
  <base-list name="Blog" url="/posts">
    <template v-slot:Manage="m_Props">
      <button @click.prevent="m_Props.fn.getAll">update</button>
    </template>
    <template v-slot:List="l_props">
      {{l_props.list}}
    </template>
  </base-list>
</template>

<script>
import listTags from './listTags'
import BaseList from './BaseList'

export default {
  components: {
    listTags,
    BaseList
  }
}
</script>

<style>

</style>