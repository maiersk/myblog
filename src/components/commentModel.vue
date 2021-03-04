<template>
  <div class="comment_inner flex">
    <div class="comment_avatar">
      <!-- <img v-if="state.isLogged" :src="state.user.avatar">
      <faIcon v-else :icon="['fab', 'github']" size='2x'></faIcon> -->
      <panel-presonal :options="{
        name: 'Test',
        nameShow: false,
        avatar: state?.user?.avatar ?? null,
        avatarSize: [32, 32],
        nameAvatar: !state.isLogged,
        color: '#ffffff',
        vertical: false,
        l_h: true,
      }"></panel-presonal>
    </div>
    <div class="comment_content" v-if="send_mode">
      <textarea class="textarea_c" rows="4"></textarea>

      <base-btn class="ml-auto" btnValue="Send"></base-btn>     
    </div>
    <div class="comment_content" v-else>
      <div class="comment_content_author">
        <slot name="content_author">
          <span class="author_name">
            {{model.userId}}
          </span>
          <span class="author_time" v-if="model.createdAt">
            {{$root.format_time(model.createdAt, "YYYY-mm-dd")}}
          </span>
        </slot>
      </div>

      <div class="comment_content_detail">
        <slot name="content_detail">
          <div class="article_detail">
            {{model.content}}
          </div>
        </slot>
      </div>

      <ul class="comment_actions c_ul">
        <!-- <li></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import panelPresonal from "./panelPresonal";
import BaseBtn from "./BaseButton";

export default {
  components: {
    panelPresonal,
    BaseBtn,
  },
  props: {
    send_mode: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default() {
        return {
          content: ''
        }
      }
    }
  },
  data() {
    return {
      state: this.$store.state
    }
  }
}
</script>

<style lang="scss" scoped>
.comment_avatar {
  margin: 0 12px;
  cursor: pointer;
}
.comment_content {
  width: 100%;
  padding: 0 10px;
  max-height: 100%;
  height: 100%;
  .textarea_c {
    width: 100%;
    max-width: 100%;
    height: 94px;
    min-height: 32px;
  }
}
</style>