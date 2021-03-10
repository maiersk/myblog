<template>
  <div class="container">
    <div class="operate">
      <form class="container">
        <slot name="c_operate" :curd="this">
          something
        </slot>
      </form>
    </div>

    <base-list :array="list.data" :row="options.row">
      <template #c_item="d">
        <slot name="c_item" :item="d.item">
          {{d.item.name}}
        </slot>
      </template>
    </base-list>

    <!-- 列表分页 -->
    <page-btns
      :ref="pageBtnsRef"
      :paging="options.paging"
      :pagecount="options.pagecount"
      @getAll="getAll()"
    ></page-btns>
  </div>
</template>

<script>
import BaseList from "../../BaseList";
import listBaseCRUD from "../listBaseCRUD";

export default {
  components: {
    BaseList,
  },
  mixins: [
    listBaseCRUD
  ],
  inject: ['model'],
  props: {
  },
  created() {
    this.pageBtnsRef = `${this.name}_page_btns`
  },
}
</script>

<style>

</style>