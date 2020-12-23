<template>
  <div class="theme">
    <aside>
      <div class="presonal">
        <img id="avatar" src="./assets/avatar.jpg" width="64" height="64">
        <router-link to="/about" id="name">
          <span> Maiersk </span>
        </router-link>
        <!-- <span v-if="moreinfo.disply">
          <li v-for="oldname in moreinfo.names" :key="oldname">
            {{oldname}}
          </li>
        </span> -->
      </div>
      <Navbar :navlinks="links" />

      <footer>
        <AcIcon :account_pages="ac_pages" />
      </footer>
    </aside>
    
    <main>
      <router-view></router-view>      
    </main>
  </div>
</template>

<script>
import Navbar from './components/navbar.vue'
import AcIcon from './components/account_icon'

export default {
  name: 'App',
  components: {
    Navbar, 
    AcIcon,
  },
  data() {
    return {
      moreinfo: {display: false, names: ['ABTTEX']},
      links: [
        {to: '/', title: 'Home'},
        {to: '/blog', title: 'Blog'},
        {to: '/project', title: 'Project'},
        {to: '/about', title: 'About'},
      ],
      ac_pages: [
        {href: 'https://github.com/maiersk', icon:['fab','github']},
        {title: '1103178985', icon:['fab', 'qq']},
        {href: 'https://weibo.com/5092698277/', icon:['fab','weibo']},
        {href: 'https://space.bilibili.com/7947919', img:'../assets/bilibili.png'}
      ]
    }
  },
}
</script>

<style lang="scss">
@import '../public/scss/global.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

aside {
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

main {
  margin-left: $navbar-width;
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
