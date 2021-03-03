<template>
  <div class="presonal"
    :class="`
      ${!(options?.vertical ?? false) ? 'no_vertical' : ''}
      ${(options?.l_h ?? false) ? 'l_h' : ''}
      ${(options?.r_h ?? false) ? 'r_h' : ''}
    `"
  >
    <img id="avatar" v-if="options?.avatar ?? false"
      :src="options?.avatar ?? ''"
      :width="options?.avatarSize?.[0] ?? 64" 
      :height="options?.avatarSize?.[1] ?? 64" 
    />
    <span class="nameAvatar" v-else-if="(options?.nameAvatar ?? false) && options.name">
      <span class="nameAvatar-string" :style="`transform: scale(1.5) translateX(-50%);`">{{options.name.substring(0,1)}}</span>
    </span>
    <faIcon id="avatar" v-else
      :icon="['fab', 'github']"
      size="2x"
    ></faIcon>

    <span id="name" v-if="options?.nameShow ?? true"
      :style="`color: ${options?.color ?? 'black'}`"
    >{{options?.name ?? 'Guest'}}</span>
  </div>
</template>

<script>

export default {
  props: {
    options: {
      type: Object,
      default() {
        return {
          name: '',
          avatar: '',
          avatarSize: [64, 64],
          vertical: true,
          color: '',
          nameAvatar: '',
          nameShow: null,
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
    .nameAvatar {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      color: rgba(0,0,0,.65);
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5;
      list-style: none;
      -webkit-font-feature-settings: "tnum";
      font-feature-settings: "tnum","tnum";
      position: relative;
      display: inline-block;
      overflow: hidden;
      color: #fff;
      white-space: nowrap;
      text-align: center;
      vertical-align: middle;
      background: #ccc;
      width: 32px;
      height: 32px;
      line-height: 32px;
      border-radius: 50%;
    }
    .nameAvatar-string {
      position: absolute;
      left: 50%;
      -webkit-transform-origin: 0 center;
      -ms-transform-origin: 0 center;
      transform-origin: 0 center;
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

  .l_h {
    flex-flow: row !important;
  }
  .r_h {
    flex-flow: row-reverse !important;
  }
  .no_vertical {
    margin-top: 0;

    #name {
      margin-top: 0;
      margin: 0 1rem;
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