<template>
  <div class="part_account">
    <span>Account Page:</span>

    <div>
      <a
        v-for="icon in account_pages"
        :key="icon" class="c_a"
        :href="icon.href ? icon.href : '#'"
        :title="icon.title ? icon.title : ''"
        width="32"
      >
        <svg
          v-if="icon.data"
          class="svg-inline--fa fa-weibo fa-w-16 fa-2x faicon"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="weibo"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          data-v-e2751c4a
        >
          <path
            transform="matrix(1.28 0 0 1.3656 0 0)"
            width="24" height="24"
            x="0" y="0" fill="currentColor"
            :d="icon.data"
          />
        </svg>
        <faIcon v-else class="faicon" :icon="icon.icon" size="2x"></faIcon>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    account_pages: Object,
  },
};
</script>

<style lang="scss" scoped>
.part_account {
  margin-bottom: 1rem;
  text-align: center;

  span {
    font-weight: bolder;
  }
  div {
    margin-top: 0.5rem;
    display: flex;
    justify-content: center;

    a {
      margin: 0.5rem;
      height: 100%;
      color: white;

      .faicon {
        color: white;
      }
      #c_icon {
        fill: white;
      }
    }
  }
}

@media (max-width: 768px) {
  .part_account {
    display: block;
    margin-bottom: 0;
  }
}
</style>