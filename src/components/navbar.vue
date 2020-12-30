<template>
  <div class="nav_content">
    <button class="c_a btn btn-theme bar_btn" @click="bar_open = !bar_open">
      <faIcon :icon="['fa', 'bars']"></faIcon>
    </button>
    <div class="navbar" :class="bar_open ? 'nav_open' : ''">
      <ul class="c_ul">
        <li v-for="link in navlinks" :key="link">
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
    
    return {
      bar_open,
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../public/scss/global.scss';
  
  .nav_content {
    .bar_btn {
      display: none;
    }
  }
  .navbar {
    margin: 0 auto;
    ul {
      margin-top: 5rem;
      margin-left: auto;
      margin-right: auto;

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
      height: 100%;

      .bar_btn {
        display: block;
        width: 2.5rem;
        height: 2.5rem;
        margin: 1.5rem;
      }

      .navbar {
        position: relative;
        top: 0;
        width: 100% !important;
        background-color: $navbar_bg_color;
        transform: translateY(-200%);
        transition: all .5s ease;
        height: 100%;
        z-index: -1;

        ul {
          margin: 0;
          height: 100%;
          li {
            margin: 0.5rem;
            margin-top: 0;
          }
          // a {
            
          //   span {
              
          //   }
          // }
        }
      }

      .nav_open {
        transform: translateY(-10%);
      }
    }
  }
</style>