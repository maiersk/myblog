<template>
  <div class="presonal">
    <img id="avatar" src="../assets/avatar.jpg" width="64" height="64" />
    <router-link to="/about" id="name">
      <span>Maiersk</span>
    </router-link>
  </div>
</template>

<script>
export default {}
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

  @media (max-width: 768px) {
    .presonal {
      margin-top: 0;
      display: flex;
      height: 100%;
      flex-flow: row-reverse;

      #avatar {
        margin: 0.5rem;
        margin-right: 1rem;
      }
      #name {
        margin: 0.5rem;
      }
    }
  }
</style>