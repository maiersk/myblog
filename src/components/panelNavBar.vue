<template>
  <div class="nav_content">
    <div class="navbar" :class="state.bar_open ? 'nav_open' : ''">
      <ul class="c_ul">
        <li v-for="link in navlinks" :key="link" @click="closeBar()">
          <router-link :to="link.path">
            <faIcon class="faicon" :icon="link.meta.icon" />
            <span>{{link.meta.title}}</span>
          </router-link>
        </li>
      </ul>

      <div class="sign_panel">
        <panel-presonal v-if="state.isLogged"
          :name="state.user?.name ?? 'none'"
          :avatar="state.user?.avatar ?? ''"
          :option="{
            vertical: true,
            avatarSize: [32,32],
          }"
        />
        <panel-sign-btns />
      </div>
    </div>
    <section :class="state.bar_open ? 'nav_section' : ''"
      @click="closeBar()"
    ></section>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import panelPresonal from './panelPresonal'
import panelSignBtns from './panelSignBtns'

export default {
  components: {
    panelPresonal,
    panelSignBtns,
  },
  props: {
    navlinks: Array,
  },
  setup() {
    const store = useStore()
    const state = reactive(store.state)

    function closeBar() {
      store.commit('navBarOpenOrClose')
    }

    return {
      state,
      closeBar,
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../public/scss/global.scss';
  
  .nav_content {
    position: fixed;
    width: $navbar-width;
    margin-top: 13rem;

    .nav_section {
      display: none;
      transition: all 0.5s ease-in-out;
    }

    .navbar {
      ul {
        li {
          height: 32px;
          margin-top: 1rem;
          border-radius: 4px;
          line-height: 2rem;
          background-color: black;
          box-shadow: 0px 3px 6px 1px #2d2d2dd4;
          transition: all 0.3s ease;
        }
        li:hover {
          background-color: #2d2d2d;
          box-shadow: 0px 3px 6px 1px #2d2d2dd4;
          a { color: white; }
        }
        a {
          color: $navbar_bg_color;
          text-decoration: none;
          font-weight: bold;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease;
          
          .faicon {
            width: 18px;
            text-align: center;
          } 
          span {
            width: 30%;
            @extend .faicon;
          }
        }
      }
    }

    .sign_panel {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .nav_content {
      position: absolute;
      top: 0px;
      width: 100vw !important;
      height: 100vh;
      margin-top: 0rem;
      
      .navbar {
        position: absolute;
        top: 0;
        width: 100% !important;
        background-color: $navbar_bg_color;
        transform: translateY(-100%);
        transition: all 1s ease;
        overflow: hidden;
        z-index: 2;
        padding-top: 0.9rem;
        padding-bottom: 0.5rem;
        
        ul {
          
          li {
            margin: 0.5rem;
          }
          // a {
            
          //   span {
              
          //   }
          // }
        }
      }

      .nav_open {
        position: absolute;
        overflow: hidden;
        transform: translateY(0%);
        top: 80px;
      }

      .nav_section {
        position: fixed;
        display: block;
        width: 100vw;
        height: 100vh;
        background-color: #303030;
        opacity: 0.8;
        z-index: 1;

        transition: all 0.5s ease-out;
      }

      .sign_panel {
        display: flex;
        flex-flow: row;
        align-items: center;
        padding-left: 0.5rem;
        padding-right: 0.5rem;

        > .presonal {
          flex-flow: row !important;
        }
      }

    }

  }
</style>