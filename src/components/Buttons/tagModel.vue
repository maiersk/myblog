<template>
  <div class="tag_div">
    <base-button type="a"
      btnClass="tag_btn"
      btnValue=""
      :style="`
        border: 1px solid ${col};
        background-color: ${col+'38'};
      `"
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
    height: 20px;
    width: auto;
    max-width: 100px;

    span {
      margin-left: 8px;
      margin-right: 8px;
      font-size: 12px;
      mix-blend-mode: difference;
    }
  }
}
</style>