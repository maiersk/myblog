<template>
  <transition name="fade">
    <div class="modal" v-if="isOpen">
      <section @click="close()"></section>
      <div class="modal-body modal-theme">
        <slot name="title">
          <h1>Modal</h1>
        </slot>
        <main>
          <slot name="body">body</slot>
        </main>
      </div>
    </div>
  </transition>
</template>

<script>
import { inject } from 'vue'

export default {
  setup() {
    // 提供/注入 方法来做组件间通讯。 该方法可跨多层关系通讯
    // 使用inject注入外部provide提供isopen控制开启和关闭
    const isOpen = inject("isOpen");
    
    const close = () => {
      isOpen.value = false;
    }

    return {
      isOpen,
      close,
    }
  },
}
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }

  .modal {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50vh;
    padding-right: 15px;
    z-index: 10;

    section {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      opacity: 0.8;
      background-color: #303030;
      z-index: 20;
    }
    .modal-body {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      min-width: 50vw;
      max-width: 30vw;
      margin-top: 1.75rem;
      margin-left: auto;
      margin-right: auto;
      
      z-index: 30;
      background: rgba($color: #ffffff, $alpha: 1.0);
      border-radius: 5px;
      box-shadow: 0 0 5px 1px #2d2d2d;

      main {
        width: 100%;
        height: auto;
      }
    }
  }

  @media (max-width: 768px) {
    .modal {
      position: absolute;
      z-index: 4;
      // section {
      // }
      .modal-body {
        position: absolute;
        min-width: 80vw;
        max-width: 90vw;
        // main {
          
        // }
      }
    }
  }
</style>