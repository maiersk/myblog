<template>
  <div class="container" v-if="!state.isLogged"> 
    <base-button type="input" 
      btnValue="Sign In" 
      btnClass="sign"
      @isClick="openLogin()"
    >
    </base-button>
  </div>
  <div class="container" v-else>
    <base-button type="input" 
      btnValue="Sign Out" 
      btnClass="sign"
      @isClick="signOut()"
    >
    </base-button>
  </div>

  <teleport to="body">
    <login-modal />
  </teleport>
</template>

<script>
import { onMounted, provide, reactive, ref } from 'vue';
import loginModal from './Modals/loginModal';
import BaseButton from './BaseButton';
import axios from '../plugins/axios';
import { useStore } from 'vuex';

export default {
  components: { 
    loginModal,
    BaseButton
  },
  setup() {
    const store = useStore()
    const state = reactive(store.state)
    const isOpen = ref(false)
    // 提供/注入方法 
    // provide 和 inject 只是绑定普通数据并不是可响应的。
    // 如果你传入了一个可监听的对象，那么其对象的属性可响应的。
    provide("isOpen", isOpen)

    onMounted(() => {
      axios({
        method: 'get',
        url: '/oauth/'
      }).then((res) => {
        if (res.data.success && res.data.data) {
          store.commit("setIsLogged", true)
          store.dispatch("oauthUser", res.data.data)
        }
      }).catch((err) => {
        console.log(err);
      })
    })

    const openLogin = () => {
      isOpen.value = true
    }
    const signOut = () => {
      axios({
        method: 'get',
        url: '/oauth/signout'
      }).then((res) => {
        if (res.data.success && res.data.data) {
          store.commit("setIsLogged", false)
          store.dispatch("oauthUser", {})
          document.location = document.location.origin
        }
      }).catch((err) => {
        console.log(err);
      })
    }
    return {
      state,
      openLogin,
      signOut,
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    width: 4rem;
    display: flex;
    justify-content: center;

    .sign {
      position: relative;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 100%;
      background: black;
      color: black;
    }
    .sign:hover {
      background-color: #2d2d2d;
      // top: 0%;
      // left: 0%;
      width: 5rem;
      height: 1.5rem;
      border-radius: 10px;
      text-align: center;
      color: wheat;
    }
    .sign:active {
      height: 1.5rem;
      background-color: #232323;
    }
  }

  @media (max-width: 768px) {
    .container {
      width: 3rem;
      height: 2rem;
      z-index: 3;
      align-items: center;
      // .sign {
        
      // }
      .sign:hover {
        width: 3rem;
        height: 1rem;
      }
      .sign:active {
        height: 0.5rem;
      }
    }
  }
</style>