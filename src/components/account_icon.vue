<template>
  <div class="part_account" >
    <span>Account Page: </span>

    <div>
      <a v-for="page in account_pages" :key="page" 
        :href="page.href ? page.href : '#'"
        :title="page.title ? page.title : ''"
        width="32"
      >
        <img v-if="page.img" :src="page.img">
        <faIcon v-else class="faicon"
          :icon="page.icon" size="2x"
        ></faIcon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    account_pages: Array,
  }
}
</script>

<style lang="scss" scoped>

.part_account {
  margin-bottom: 1rem;
  div {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;

    a {
      margin: 0.5rem;
      height: 100%;
      text-decoration: none;
      color: white;

      .faicon {
        color: white;
      }
    }      
  }

  span {
    margin-left: 0.5rem;
    font-weight: bolder;
  }
}

</style>