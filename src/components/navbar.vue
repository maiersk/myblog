<template>
  <div class="navbar">
    <ul class="c_ul">
      <li v-for="link in navlinks" :key="link">
        <router-link :to="link.path">
          <faIcon class="faicon" :icon="link.meta.icon" />
          <span>{{link.meta.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    navlinks: Array,
  },
  setup() {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../public/scss/global.scss';
  
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
    .navbar {
      position: fixed;
      top: 0;
      margin: 0;
      margin-top: 1rem;

      ul {
        margin-top: 0;
        width: 100vw;

        li {
          margin-top: 0rem;
          width: 25%;
          float: left;
        }
        a {
          
          span {
            width: 60%;
          }
        }
      }
    }
  }
</style>