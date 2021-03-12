<template>
  <div class="comment flex-wrap">
    <div class="comment_inner flex">
      <div class="comment_avatar">
        <!-- <img v-if="state.isLogged" :src="state.user.avatar">
        <faIcon v-else :icon="['fab', 'github']" size='2x'></faIcon> -->
        <panel-presonal
          v-if="showAvatar"
          :options="{
            name: 'Test',
            nameShow: false,
            avatar: model?.user?.avatar ?? state?.user?.avatar ?? null,
            avatarSize: [32, 32],
            nameAvatar: !state.isLogged,
            color: '#ffffff',
            vertical: false,
            l_h: true,
          }"
        ></panel-presonal>
      </div>
      <div class="comment_content">
        <slot name="c_content">
          <div class="comment_content_author">
            <slot name="content_author">
              <span class="author_name">
                {{model.user.name}}
              </span>
              <span class="author_time" v-if="model.createdAt">
                {{$root.fromNow(model.createdAt)}}
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

          <div class="comment_actions c_ul flex">
            <slot name="c_actions">
            </slot>
          </div>
        </slot>
      </div>
    </div>

    <slot name="c_rear">

    </slot>
  </div>
</template>

<script>
import panelPresonal from "./panelPresonal";

export default {
  components: {
    panelPresonal,
  },
  props: {
    showAvatar: {
      type: Boolean,
      default: true
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
      state: this.$store.state,
      content: this.model.content
    }
  }
}
</script>

<style lang="scss">
.comment {
  width: 100%;
}

.comment_avatar {
  margin: 0 12px;
  cursor: pointer;
}
.comment_content {
  width: 100%;
  padding: 0 10px;
  max-height: 100%;
  height: 100%;

  .comment_content_author {
    .author_name {
      padding-right: 1.5rem;
    }
  }

  .comment_content_detail {
    padding: 1rem 0 1rem 0.5rem;
  }

  .textarea_c {
    width: 100%;
    max-width: 100%;
    height: 94px;
    min-height: 32px;
  }
}
</style>