<template>
  <div class="container">
    <input type="button"
      class="btn btn-theme login"
      value="Login"
      @click="openLogin"
    />
  </div>

  <teleport to="body">
    <LoginModal />
  </teleport>
</template>

<script>
import { provide, ref } from 'vue';
import LoginModal from './Modals/LoginModal';

export default { 
  components: { 
    LoginModal 
  },
  setup() {
    const isOpen = ref(false);
    // 提供/注入方法 
    // provide 和 inject 只是绑定普通数据并不是可响应的。
    // 如果你传入了一个可监听的对象，那么其对象的属性可响应的。
    provide("isOpen", isOpen);

    const openLogin = () => {
      isOpen.value = true;
    }
    return {
      openLogin,
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 0;
    left: 0;

    .login {
      position: relative;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 100%;
      background: black;
      color: black;
    }
    .login:hover {
      background-color: #2d2d2d;
      // top: 0%;
      // left: 0%;
      width: 5rem;
      height: 1.5rem;
      border-radius: 10px;
      text-align: center;
      color: wheat;
    }
    .login:active {
      height: 1.5rem;
      background-color: #232323;
    }
  }

  @media (max-width: 768px) {
    .container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 3;

      // .login {
        
      // }
      .login:hover {
        width: 3rem;
        height: 1rem;
      }
      .login:active {
        height: 0.5rem;
      }
    }
  }
</style>