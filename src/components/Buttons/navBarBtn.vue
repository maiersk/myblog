<template>
  <div class="container">
    <BaseButton btnClass="bar_btn" btnValue=""
      @click="openBar()"
    >
      <template #add_dom>
        <faIcon :icon="['fa', 'bars']"></faIcon>
      </template>
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from '../BaseButton' 

export default {
  components: {
    BaseButton
  },
  data() {
    return {

    }
  },
  methods: {
    openBar: function () {
      this.$store.commit("navBarOpenOrClose")
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    .bar_btn {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .container {
      .bar_btn {
        display: flex;
        width: 2.5rem;
        height: 2.5rem;
        margin: 1.5rem;
        z-index: 3;

        svg {
          margin: auto auto;
          font-size: 18px;
        }
      }
    }
  }
</style>