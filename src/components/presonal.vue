<template>
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
export default {
}
</script>

<style lang="scss" scoped>
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