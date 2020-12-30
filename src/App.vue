<template>
  <div class="theme">
    <aside>
      <presonal />
      <Navbar :navlinks="links" />

      <footer>
        <AcIcon :account_pages="acPages" />
      </footer>
    </aside>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Presonal from "./components/presonal";
import Navbar from "./components/navbar.vue";
import AcIcon from "./components/account_icon";
import svgData from "./assets/bilibilisvgdata";

export default {
  name: "App",
  components: {
    Presonal,
    Navbar,
    AcIcon,
  },
  data() {
    return {
      moreinfo: { display: false, names: ["ABTTEX"] },
      links: [],
      acPages: [
        { href: "https://github.com/maiersk", icon: ["fab", "github"] },
        { href: "https://steamcommunity.com/profiles/76561198098162297", icon: ["fab", "steam"] },
        { href: "https://space.bilibili.com/7947919", data: svgData },
        { title: "1103178985", icon: ["fab", "qq"] },
      ],
    };
  },
  beforeMount() {
    this.links = this.$router.getRoutes();
  }
};
</script>

<style lang="scss">
@import "../public/scss/global.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.theme {
  > aside {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    background-color: $navbar_bg_color;
  }

  .navbar {
    width: $navbar-width;
  }

  > main {
    margin-left: $navbar-width;
    height: 100vh;
    padding: 1rem;
  }
}



@media (max-width: 768px) {
  .theme {
    z-index: -30;
    > aside {
      position: relative;
      top: 0;
      width: 100vw;
      height: 85px;

      overflow: initial;
      border-top-right-radius: 0;
      border-bottom-left-radius: 10px;
      box-shadow: 0 5px 5px #960000;
      // footer {
      // }
    }
    > main {
      position: relative;
      margin-left: 0 !important;

      z-index: -20;
      // top: 10vh;
      // width: 100vw;
      // height: 100vh !important;
      // margin-left: 0 !important;
      // overflow-y: auto;

      .page-theme {
        
        > div {
          
        }
      }
    }


  }
}
</style>
