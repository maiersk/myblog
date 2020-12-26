<template>
  <Modal>
    <template #title>
      <h1>Login</h1>
    </template>
    <template #body> 
      <h2>select account login</h2>
      <div class="login_content">
        <ul class="c_ul">
          <li v-for="acc in login_accs" :key="acc">
            <a class="c_a" href="#" height="48">
              <faIcon size="3x" class="faicon" :icon="acc.icon"></faIcon>
            </a>
          </li>
        </ul>        
      </div>
    </template>
  </Modal>
</template>

<script>
import { reactive } from 'vue';
import Modal from '../Modal';

export default {
  components: {
    Modal,
  },
  setup() {
    const login_accs = reactive([
      {icon: ["fab", "github"], },
      {icon: ["fab", "steam"], },
      {icon: ["fab", "qq"], },
    ])

    return {
      login_accs
    }
  },
};
</script>

<style lang="scss" scoped>
  h1 {
    padding: 0.5rem;
  }
  h2 {
    padding: 0.5rem;
    text-align: center;
  }
  .login_content {
    display: flex;
    align-items: center;
    flex-flow: column;
  
    .c_ul > li {
      float: left;
      margin: 1rem;
      > a {

      }
    }
  }
</style>