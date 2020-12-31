<template>
  <div class="nav_content">
    <button class="c_a btn btn-theme bar_btn" @click="open()">
      <faIcon :icon="['fa', 'bars']"></faIcon>
    </button>
    <div class="navbar" :class="bar_open ? 'nav_open' : ''">
      <ul class="c_ul">
        <li v-for="link in navlinks" :key="link" @click="open()">
          <router-link :to="link.path">
            <faIcon class="faicon" :icon="link.meta.icon" />
            <span>{{link.meta.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    navlinks: Array,
  },
  setup() {
    const bar_open = ref(false);

    const open = () => {
      bar_open.value = !bar_open.value;
    }
    
    return {
      bar_open,
      open,
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../public/scss/global.scss';
  
  .nav_content {
    position: fixed;
    width: $navbar-width;
    margin-top: 10rem;

    .bar_btn {
      display: none;
    }
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

  @media (max-width: 768px) {
    .nav_content {
      position: absolute;
      top: 0px;
      width: 100vw !important;
      margin-top: 0rem;

      .bar_btn {
        display: block;
        width: 2.5rem;
        height: 2.5rem;
        margin: 1.5rem;
        z-index: 2;
      }

      .navbar {
        position: absolute;
        top: 0;
        width: 100% !important;
        background-color: $navbar_bg_color;
        transform: translateY(-100%);
        transition: all 1s ease;
        overflow: hidden;
        z-index: 1;
        padding-top: 0.9rem;
        padding-bottom: 0.3rem;
        
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
        overflow: hidden;
        transform: translateY(42%);
      }
    }
  }
</style>