<template>
  <transition name="fade">
    <div class="notifi" v-if="notifi.show">
      <div v-if="notifi.success" class="success">
        <div class="faicon">
          <faIcon :icon="['fas','check-circle']"></faIcon>
        </div>
        <span>
          {{notifi.message}}
        </span>
      </div>
      <div v-else class="error">
        <div class="faicon">
          <faIcon :icon="['fas','times']"></faIcon>
        </div>
        <span>
          {{notifi.message}}
        </span>
      </div>
    </div>
  </transition>
</template>

<script>
import { inject } from 'vue'
export default {
  setup() {
    const notifi = inject('notifi')

    return {
      notifi
    }
  }
}
</script>

<style lang="scss" scoped>
  $notifi_bg_col: #333;
  $notifi_txt_col: #ffffff;
  $notifi_icon_bg_col: #232323;
  $notifi_icon_broder_col: black;
  $notifi_success_col: #1fafff;
  $notifi_error_col: #ff562b;

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }

  .notifi {
    width: 20rem;
    height: 48px;
    position: fixed;
    right: 0;
    bottom: 5rem;

    background-color: $notifi_bg_col;

    .success {
      display: flex;
      align-items: center;

      color: $notifi_success_col;
      .faicon {
        height: 48px;
        width: 48px;
        background-color: $notifi_icon_bg_col;
        border: 1px solid $notifi_icon_broder_col;
        
        svg {
          width: 32px;
          height: 32px;
          margin: 0.5rem;
        }
      }
      span {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        color: $notifi_txt_col;
      }
    }

    .error {
      @extend .success;
      color: $notifi_error_col;
    }
  }
</style>