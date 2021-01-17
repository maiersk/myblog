<template>
  <div class="presonal"
    :class="!option.vertical ? 'no_vertical' : ''" 
  >
    <img id="avatar"
      :src="avatar ? avatar : require('@/assets/avatar.jpg')"
      :width="option.avatarSize[0]" 
      :height="option.avatarSize[1]" 
    />
    <router-link :to="routerLink" id="name">
      <span>{{name}}</span>
    </router-link>
  </div>
</template>

<script>

export default {
  props: {
    name: {
      type: String,
      default: 'Maiersk'
    },
    routerLink: {
      type: String,
      default: '/about'
    },
    avatar: {
      type: String,
      default: ''
    },
    option: {
      type: Object,
      default() {
        return {
          avatarSize: [64, 64],
          vertical: true,
        }
      }
    }
  },
  beforeCreate() {
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
  .presonal {
    display: flex;
    align-items: center;
    flex-flow: column;

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

  .no_vertical {
    margin-top: 0;
    flex-flow: row-reverse !important;

    #name {
      margin-top: 0;
      margin-right: 1rem;
    }
  }

  .vertical {
    #avatar {
      margin: 0 !important;
    }
    flex-flow: column !important;
  }

  @media (max-width: 768px) {
    .presonal {
      margin-top: 0;
      display: flex;
      height: auto;
      flex-flow: row-reverse;

      #avatar {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
      #name {
        margin: 0.5rem;
      }
    }

    .no_vertical { 
      #avatar {
        box-shadow: 0 0 5px 1px #303030;
        margin: 0;
      }
      #name {
        font-size: 10px;
      }
    }

  }
</style>