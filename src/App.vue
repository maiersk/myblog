<template>
  <div class="theme">
    <header>
      <panel-presonal 
        v-if="state.isLogged"
        :name="state.user.name"
        :avatar="state.user.avatar"
        :option="{
          avatarSize:[32,32],
          vertical:false,
        }"
      />
      <panel-sign-btns />
    </header>
    <aside>
      <nav-bar-btn />
      <panel-presonal />
    </aside>
    <panel-nav-bar :navlinks="links" />

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <panel-ac-icon :account_pages="acPages" />
    </footer>

    <notification />
  </div>
</template>

<script>
import svgData from "./assets/bilibilisvgdata";
import navBarBtn from "./components/Buttons/navBarBtn";
import panelNavBar from "./components/panelNavBar";
import panelPresonal from "./components/panelPresonal";
import panelAcIcon from "./components/panelAccountIcon";
import panelSignBtns from './components/panelSignBtns';
import useNotification from './utilities/mixins/useNotification';

export default {
  name: "App",
  mixins: [
    useNotification,
  ],
  components: {
    navBarBtn,
    panelNavBar,
    panelPresonal,
    panelAcIcon,
    panelSignBtns,
  },
  data() {
    return {
      state: this.$store.state,
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
  },
};
</script>

<style lang="scss">
@import "../public/scss/theme.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.theme {
  > header {
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100vw;
    height: 3rem;

    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  > aside {
    position: fixed;
    top: 3rem;
    left: 0;
    bottom: 0;
    overflow-y: auto;
    background-color: $navbar_bg_color;
    width: $navbar-width;

    .presonal {
      margin-top: 1rem;
    }
  }
  
  > main {
    margin-left: $navbar-width;
    padding: 1rem;
    padding-top: 3rem + 1rem;
  }

  > footer {
    width: $navbar-width;
    overflow-x: auto;
    position: fixed;
    bottom: 0;
  }
}



@media (max-width: 768px) {
  .theme {
    > header {
      display: none;
    }

    > aside {
      position: relative;
      top: 0;
      width: 100vw;
      height: 85px;
      z-index: 3;
      overflow: initial;
      border-top-right-radius: 0;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      box-shadow: 0 5px 5px $c_red;

      display: flex;
      justify-content: space-between;

      .presonal {
        margin-top: 0;
      }
    }

    > main {
      position: relative;
      margin-left: 0 !important;
      padding: 0.5rem;
      padding-top: 0.8rem;

      .page-theme {
        padding: 0.25rem;
        // > div {
          
        // }
      }
    }

    > footer {
      position: relative;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
