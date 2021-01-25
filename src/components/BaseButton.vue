<template> 
  <input type="button"
    v-if="type === 'input'"
    class="btn btn-theme"
    :class="btnClass"
    :value="btnValue"
    @click="operate()"
  />
  <a v-else-if="type === 'a'"
    class="btn btn-theme"
    :class="btnClass"
    @click="operate()"
  >
    {{btnValue}}
    <slot name="add_dom"></slot>
  </a>
  <button v-else
    class="btn btn-theme"
    :class="btnClass"
    @click="operate()"
  >
    {{btnValue}}
    <slot name="add_dom"></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    btnValue: String,
    btnClass: String,
  },
  data() {
    return {
      isClick: false
    }
  },
  methods: {
    operate: function() {
      this.isClick = !this.isClick
      this.$emit('isClick', this.isClick)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
