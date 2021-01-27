<template> 
  <input type="button"
    :ref="`BaseBtnRef_${btnClass}`"
    v-if="type === 'input'"
    class="btn btn-theme"
    :class="btnClass"
    :value="btnValue"
  />
  <a v-else-if="type === 'a'"
    :ref="`BaseBtnRef_${btnClass}`"
    class="btn btn-theme"
    :class="btnClass"
  >
    {{btnValue}}
    <slot name="add_dom"></slot>
  </a>
  <button v-else
    :ref="`BaseBtnRef_${btnClass}`"
    class="btn btn-theme"
    :class="btnClass"
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
    btnClass: {
      type: String,
      default() {
        return `temp_${Math.floor(Math.random() * 50)}`
      }
    },
    display: Boolean,
  },
  data() {
    return {

    }
  },
  mounted() {
    const _btnRef = this.$refs?.[`BaseBtnRef_${this.btnClass}`]

    if (this.display) {
      _btnRef.className += this?.display ? ' none_display' : ''
    }
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
a {
  display: flex;
  align-items: center;
  justify-content: center;
}

.none_display {
  display: none;
}
</style>
