<template>
  <div class="tag_div">
    <base-button 
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