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
    <!-- <span v-if="moreinfo.disply">
      <li v-for="oldname in moreinfo.names" :key="oldname">
        {{oldname}}
      </li>
    </span>-->
  </div>
</template>

<script>
// import { ref } from 'vue';
// import modal from "../components/modal";

export default {
  extends: {
  },
  setup() {
    const openLogin = () => {
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
    width: 10px;
    height: 10px;
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
    background-color: #232323;
    top: 1px;
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
</style>