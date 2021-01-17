<template>
  <div class="tag_div">
    <base-button 
      btnClass="tag_btn"
      btnValue=""
      :style="'background-color: rgba' +
        `(${col[0]}, ${col[1]}, ${col[2]}, ${col[3]})`
      "
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
      type: Array,
      default() {
        return [255, 255, 255, 255]
      }
    }
  },
  components: {
    BaseButton
  }
}
</script>

<style lang="scss" scoped>
  .tag_div {
    .tag_btn {

      span {
        mix-blend-mode: difference;
      }
    }
  }
</style>