<template>
  <input type="button" 
    class="btn btn-theme login" 
    value="Login"
    @click="openLogin"
  >

  <div class="presonal">
    <img id="avatar" src="../assets/avatar.jpg" width="64" height="64" />
    <router-link to="/about" id="name">
      <span>Maiersk</span>
    </router-link>
  </div>

  <teleport to="body">
    <LoginModal />
  </teleport>
</template>

<script>
import { provide, ref } from 'vue';
import LoginModal from "../components/Modals/LoginModal";

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
}
</script>

<style lang="scss" scoped>
  .login {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 100%;
    background: black;
    color: #151515;
  }
  .login:hover {
    background-color: #2d2d2d;
    // top: 0%;
    // left: 0%;
    width: 5rem;
    height: 1.5rem;
    border-radius: 10px;
    text-align: center;
  }
  .login:active {
    height: 1.5rem;
    background-color: #232323;
  }

  .presonal {
    display: flex;
    align-items: center;
    flex-flow: column;
    margin-top: 1rem;

    #avatar {
      border-radius: 30px;
      box-shadow: 0 0 10px 2px #303030;
    }
    #name {
      margin-top: 1rem;
      color: black;
      text-decoration: none;
      cursor: pointer;
      font: {
        weight: bolder;
      }
    }
  }

  @media (max-width: 768px) {
    .login {
      display: none;
    }
    .login:hover {
      width: 3rem;
      height: 0.8rem;
    }
    .login:active {
      height: 0.5rem;
    }
    .presonal {
      margin-top: 0;
      padding: 0.1rem;
      display: flex;
      flex-flow: row-reverse;

      #avatar {
        margin: 0.5rem;
      }
      #name {
        margin: 0.5rem;
      }
    }
  }
</style>