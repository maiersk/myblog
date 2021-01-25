<template>
  <div class="tag_div">
    <base-button type="a"
      btnClass="tag_btn"
      btnValue=""
      :style="`background-color: ${col}`"
    >
      <template #add_dom>
        <span>{{name}}</span>
      </template>
    </base-button>
  </div>
</template>

<script>
import BaseButton from '../BaseButton'

export default {
  props: {
    name: {
      type: String,
      default: 'Tag'
    },
    col: {
      type: String,
      default: '#ffffff'
    },
  },
  components: {
    BaseButton
  }
}
</script>

<style lang="scss" scoped>
.tag_div {
  > .tag_btn {
    margin: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      mix-blend-mode: difference;
    }
  }
}
</style>