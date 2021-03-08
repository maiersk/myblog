<template>
  <slot name="c_baselist" :list="array">
    <ul class="ul_list c_ul" :class="row ? 'flex-row' : 'flex-column'">
      <span class="m-1 block-center" v-if="!array?.length">no item</span>
      <li v-for="item in array" :key="item.id">
        <slot name="c_item" :item="item">
          {{item.name}}
        </slot>
      </li>
    </ul>
  </slot>
</template>

<script>
export default {
  components: {
  },
  props: {
    array: {
      type: Array,
      default() {
        return []
      }
    },
    row: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.ul_list {
  li {
    display: flex;
    align-items: center;
    margin: 0.25rem;
  }
}
</style>
